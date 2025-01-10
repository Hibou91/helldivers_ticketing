export default {
    createId (array){
        if(!array || array.length == 0){
          return 1;
        } 
        let id = 1;
        for(let i = 0; i < array.length; i++){
          if(array[i].id > id){
            id = array[i].id;
          }
        }
        
        return ++id;
      }
}