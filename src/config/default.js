TOOLS_ENVIRONMENT = {
    production: false,
    hxlProxy: 'https://proxy.hxlstandard.org/data.json',
    hxlCheck: 'http://www.mocky.io/v2/59e0f52f0f00003405effd4c', // succesful hxl check
    // hxlCheck: 'http://www.mocky.io/v2/59ec7fc03100009601d24e0e', // failing hxl check
    hxlPreview: 'http://localhost:4201',
    googleAnalyticsKey: 'UA-48221887-3',
    prodMixpanelKey: '99035923ee0a67880e6c05ab92b6cbc0', // actually hdx-server project not prod
    testMixpanelKey: '875bfe50f9cb981f4e2817832c83c165',
    prodHostname: 'tools.humdata.org' // used by analytics code to decide which key to use
};
