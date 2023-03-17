const SimpleComponentFramework = () => (() => { 
    const createComponentRaw = (str) => {
        const support = (function () {
            if (!window.DOMParser) return false;
            var parser = new DOMParser();
            try {
                parser.parseFromString('x', 'text/html');
            } catch (err) {
                console.trace(err);
                return false;
            }
            return true;
        })();

        let element = null;
        if (support) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(str, 'text/html');
            element = doc.body.children[0];
        } else {
            var dom = document.createElement('div');
            dom.innerHTML = str;
            element = dom.children[0];
        }   

        const updateElement = (element) => {
            return (fn) => {
                fn(element);
            }
        }

        return [element, updateElement(element)];
    }

    const DefaultNodeObj = {
        type: "",
        className: "",
        props: {},
        children: [],
    }

    const createComponent = (nodeObj = DefaultNodeObj) => {
        const [$el, $updateEl] = createComponentRaw(`<${nodeObj.type}></${nodeObj.type}>`);
        
        if (nodeObj.className !== "") {
            $el.className = nodeObj.className;
        }

        const props = nodeObj.props;
        if (props) {
            for (const prop in props) {
                $el.setAttribute(prop, props[prop]);
            }
        }
        
        const children = nodeObj.children;
        if (children) {
            if (!Array.isArray(children)) throw new Error(`Children should be an array, but got a '${typeof children}'`);
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (child instanceof HTMLElement) {
                    $el.appendChild(child);
                } else {
                    $el.appendChild(document.createTextNode(child));
                }
            }
        }
        return [$el, $updateEl];
    }


    return {
        createComponent,
    }
})();


