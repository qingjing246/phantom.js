var page = require('webpage').create(),
system =require('system'),
t,address;

if(system.args.length === 1){
    console.log('usage:loadspeed.js<some URL>');
    phantom.exit();
}

t = Date.now();
address = system.args[1];
page.open(address,function(status){
    if(status !== 'success'){
        consolo.log('not find address');
    }else{
        t =Date.now() - t;
        console.log('loading'+system.args[1]);
        console.log('loading'+t+'msec');
    }
    phantom.exit();
});