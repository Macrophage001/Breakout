const { div } = std_elements();
const { generateLoopCallback } = Generators();
const inputs = new InputSystem();

const root = document.querySelector("#root");

let paddlePosition = {
    x: 0,
    y: 0,
}

let paddleVelocity = {
    x: 5,
    y: 5,
}

class GameState{
    static PLAYING = 'PLAYING';
}

class InputState{
    static ARROWUP    = 'ArrowUp';
    static ARROWDOWN  = 'ArrowDown';
    static ARROWLEFT  = 'ArrowLeft';
    static ARROWRIGHT = 'ArrowRight';
}

const FPS = 120;

const currentState = GameState.PLAYING;

const [paddleDiv] = div({
    className: 'paddle',
});

const [gameWindowDiv, updateGameWindowDiv] = div({
    className: 'game-window',
    children: [
        paddleDiv,
    ]
});

const handleInputState = (type, payload) => {
    switch(type) {
        case InputState.ARROWUP:
            paddlePosition = {...paddlePosition, y: paddlePosition.y - payload.y};
            break;
        case InputState.ARROWDOWN:
            paddlePosition = {...paddlePosition, y: paddlePosition.y + payload.y};
            break;
        case InputState.ARROWLEFT:
            paddlePosition = {...paddlePosition, x: paddlePosition.x - payload.x};
            break;
        case InputState.ARROWRIGHT:
            paddlePosition = {...paddlePosition, x: paddlePosition.x + payload.x};
            break;
    }
    paddleDiv.style = `transform: translate(${paddlePosition.x}px, ${paddlePosition.y}px)`;
}

const initInputs = () => {
    inputs.AddKeyHandler(InputState.ARROWUP, () => {
        handleInputState(InputState.ARROWUP, paddleVelocity);
    });
    inputs.AddKeyHandler(InputState.ARROWDOWN, () => {
        handleInputState(InputState.ARROWDOWN, paddleVelocity);
    });
    inputs.AddKeyHandler(InputState.ARROWLEFT, () => {
        handleInputState(InputState.ARROWLEFT, paddleVelocity);
    });
    inputs.AddKeyHandler(InputState.ARROWRIGHT, () => {
        handleInputState(InputState.ARROWRIGHT, paddleVelocity);
    });
}


const init = () => {
    initInputs();
}

// TODO: Need to make a better game loop function.
const gameLoop = () => {
    const fixedDeltaTime = 1/FPS;
    let accTime = 0;
    let lastFrameTime = performance.now();

    const loop = () => {
        const now = performance.now();
        const deltaTime = (now - lastFrameTime) / 1000;
        lastFrameTime = now;

        accTime += deltaTime;

        while (accTime >= fixedDeltaTime) {
            console.log('FixedDeltaTime: ', fixedDeltaTime);
            switch(currentState) {
                case GameState.PLAYING:
                    inputs.HandleKeys();
                    break;
            }
            accTime -= fixedDeltaTime;
        }

        requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

const [App] = div({
    className: 'app',
    children: [
        gameWindowDiv,
    ],
});

root.appendChild(App)

init();
gameLoop();
