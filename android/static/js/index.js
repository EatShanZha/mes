var config = (function ($) {
    $.testConfig = {
        MesPath: 'http://192.168.1.140:8000/',
        maps: [
            {id: 'map1', url: 'http://192.168.1.140:8000/'}
        ]
    };
    return $;
})
(window.config || {});