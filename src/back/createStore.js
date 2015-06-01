import Config from "./Config";
import Ajax from "./Ajax";

class Store {}

module.exports = (definition = {})=> {
  if(definition.ajax)
    throw new Error("Cannot define a function called ajax.");

  var store = new Store();
  for(var fun in definition){
    var def = definition[fun];
    store[fun] = typeof def === 'function' ? def.bind(store) : def;
  }


  var ajaxOpts = Config.get('ajax')
  if(!ajaxOpts)
    throw new Error("The App should be configured with the ajax options")
  store.ajax = new Ajax(ajaxOpts);

  return store;
}
