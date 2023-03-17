const std_elements = () => (() => {
    const { createComponent } = SimpleComponentFramework();

    const div = (props) => createComponent({type: 'div', ...props});
    const pre = (props) => createComponent({type: 'pre', ...props});
    const input = (props) => createComponent({type: 'input', ...props});
    const form = (props) => createComponent({type: 'form', ...props});
    const button = (props) => createComponent({type:'button', ...props});
    const label = (props) => createComponent({type: 'label', ...props});

    return {
        div,
        pre,
        input,
        form,
        button,
        label,
    }
})();
