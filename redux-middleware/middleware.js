import { createStore, applyMiddleware } from 'redux';

function todos(state, action) {
    switch (action.type) {
        case ADD: 
            return Object.assign({}, state, {
               lastAction: action.type 
            })
        default:
            return state    
    }
    
}

function logger({getState}) {
    console.log(1, getState)
    return function(next) {
        console.log(2, next)
        return function(action) {
            console.log(3, 'will dispatch', action)

            let returnValue = next(action)

            console.log('state after dispatch', getState())

            // Este seguramente sera la acción, excepto
            // que un middleware anterior la haya modificado.
            return returnValue
        }.bind(this)
    }.bind(this)
}

let store = createStore(
    todos,
    ['Use Redux'],
    applyMiddleware(logger)
)

store.dispatch({
    type: 'ADD',
    text: 'Understand the middleware'
  })