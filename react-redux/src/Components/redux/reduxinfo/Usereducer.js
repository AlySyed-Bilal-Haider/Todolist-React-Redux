
// this initial dumy value;
const adduser=[{
    id:Math.random().toString(),
    name:'bilal',
    email:'biallal@gmail.com'
}];

// reducer perform actions, initial state and get data in redux Store;
const Reducer=(state=adduser,action)=>{
    switch(action.type){
        // this is add actions
        case "adduser":
            return[
            ...state,
            {
                id:action.id,
                name:action.name,
                email:action.email
            } ]
           case "delete":
            let newState = [...state];
            newState.splice(action.index, 1);
            return newState;

         case 'edite':
       const a=state.map((content) => content.id === action.id ? {...content, name: action.name, email:action.email}: content)
        return a;
        
                case 'Preview':
                  console.log("action",action.id)
                   const remainedValue=state.filter((items)=> items.id=== action.id)
                   console.log("filter value",remainedValue);
                   return remainedValue;
       
                   default: return state;
    }}
export default Reducer;