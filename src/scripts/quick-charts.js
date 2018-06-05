$(document).ready(function() {
    var iframeUrlMap = [
        'https://tools.humdata.org/quickcharts/app/show;url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1_S6PA5L32Mq7H_cfp9NAe-Y8-17hNer2OMyb3hVPTvU%2Fexport%3Fformat%3Dcsv%26id%3D1_S6PA5L32Mq7H_cfp9NAe-Y8-17hNer2OMyb3hVPTvU%26gid%3D1516521608;embeddedSource=BRC%2520Maps%2520Team;embeddedUrl=http%3A%2F%2Fdata.humdata.org%2Fdataset%2F387ec1a2-71c2-49e0-b4fd-21952c4d5ecf;embeddedDate=November%25206%252C%25202017;embeddedConfig=%7B%22configVersion%22%3A2%2C%22bites%22%3A%5B%7B%22init%22%3Atrue%2C%22type%22%3A%22key%20figure%22%2C%22filteredValues%22%3A%5B%5D%2C%22errorMsg%22%3Anull%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23country%2Bname%22%2C%22aggregateFunction%22%3A%22distinct-count%22%7D%2C%22dataTitle%22%3A%22%23country%2Bname%22%2C%22displayCategory%22%3A%22Key%20Figures%22%2C%22unit%22%3Anull%2C%22hashCode%22%3A760157022%2C%22title%22%3A%22Countries%20Affected%22%2C%22value%22%3Anull%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22timeseries%22%2C%22filteredValues%22%3A%5B%5D%2C%22errorMsg%22%3Anull%2C%22swapAxis%22%3Atrue%2C%22showGrid%22%3Atrue%2C%22pieChart%22%3Afalse%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23affected%22%2C%22aggregateFunction%22%3A%22sum%22%2C%22dateColumn%22%3A%22%23date%2Bdata%2Bpublication%22%7D%2C%22dataTitle%22%3A%22%23affected%22%2C%22displayCategory%22%3A%22Timeseries%22%2C%22hashCode%22%3A-459370349%2C%22title%22%3A%22Cumulative%20Affected%22%2C%22values%22%3Anull%2C%22description%22%3A%22%20Includes%20confirmed%20cases%2C%20suspected%20cases%2C%20and%20deaths%20%22%2C%22categories%22%3Anull%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22key%20figure%22%2C%22filteredValues%22%3A%5B%5D%2C%22errorMsg%22%3Anull%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23affected%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22%23affected%22%2C%22displayCategory%22%3A%22Key%20Figures%22%2C%22unit%22%3A%22mln%22%2C%22hashCode%22%3A-627224206%2C%22title%22%3A%22Total%20Number%20of%20Cases%22%2C%22value%22%3Anull%7D%5D%7D;sample=true',
        'https://tools.humdata.org/quickcharts/app/show;url=http%3A%2F%2Fdata.humdata.org%2Fdataset%2F94b6d7f8-9b6d-4bca-81d7-6abb83edae16%2Fresource%2Fc7fb99a5-43ec-4b3f-b8db-935640c75aeb%2Fdownload%2Fassesment_data_crm_05april2017.xlsx;embeddedConfig=%7B%22configVersion%22%3A2%2C%22bites%22%3A%5B%7B%22init%22%3Atrue%2C%22type%22%3A%22key%20figure%22%2C%22filteredValues%22%3A%5B%5D%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23affected%2Bidps%2Bindividuals%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22%23affected%2Bidps%2Bindividuals%22%2C%22displayCategory%22%3A%22Key%20Figures%22%2C%22unit%22%3A%22k%22%2C%22hashCode%22%3A-624368058%2C%22title%22%3A%22Total%20Displaced%20People%22%2C%22value%22%3Anull%2C%22postText%22%3A%22Displaced%20People%22%2C%22description%22%3A%22Total%20number%20of%20people%20displaced%20from%20their%20homes%20due%20to%20flooking%20across%20all%20affected%20regions%22%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22chart%22%2C%22filteredValues%22%3A%5B%5D%2C%22swapAxis%22%3Atrue%2C%22showGrid%22%3Afalse%2C%22pieChart%22%3Afalse%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3A%22%23adm1%2Bname%22%2C%22valueColumn%22%3A%22%23affected%2Bidps%2Bindividuals%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22Number%20of%20displaced%20people%22%2C%22displayCategory%22%3A%22Charts%22%2C%22hashCode%22%3A1871296107%2C%22title%22%3A%22Displaced%20People%20by%20Region%22%2C%22values%22%3Anull%2C%22categories%22%3Anull%2C%22description%22%3A%22Number%20of%20people%20displaced%20from%20their%20homes%20due%20to%20flooding%2C%20by%20region%22%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22chart%22%2C%22filteredValues%22%3A%5B%5D%2C%22swapAxis%22%3Atrue%2C%22showGrid%22%3Atrue%2C%22pieChart%22%3Afalse%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3A%22%23adm1%2Bname%22%2C%22valueColumn%22%3A%22%23affected%2Bflooded%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22Number%20of%20flooded%20houses%22%2C%22displayCategory%22%3A%22Charts%22%2C%22hashCode%22%3A-553482921%2C%22title%22%3A%22Flooded%20Houses%20by%20Region%22%2C%22values%22%3Anull%2C%22categories%22%3Anull%2C%22description%22%3A%22Number%20of%20houses%20that%20were%20flooded%20during%20the%20event%20based%20on%20needs%20assessment%20surveys%2C%20broken%20down%20by%20region%22%7D%5D%7D;sample=true',
        'https://tools.humdata.org/quickcharts/app/show;url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1iR-JFC3CUykIHfw88Plvfoukvww6AZaf-EYYrOn_KYw%2Fexport%3Fformat%3Dcsv%26id%3D1iR-JFC3CUykIHfw88Plvfoukvww6AZaf-EYYrOn_KYw%26gid%3D1656685143;embeddedConfig=%7B%22configVersion%22%3A2%2C%22bites%22%3A%5B%7B%22init%22%3Atrue%2C%22type%22%3A%22chart%22%2C%22filteredValues%22%3A%5B%5D%2C%22swapAxis%22%3Atrue%2C%22showGrid%22%3Atrue%2C%22pieChart%22%3Afalse%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3A%22%23country%22%2C%22valueColumn%22%3A%22%23count%22%2C%22aggregateFunction%22%3A%22count%22%7D%2C%22dataTitle%22%3A%22%23count%22%2C%22displayCategory%22%3A%22Charts%22%2C%22hashCode%22%3A853645373%2C%22title%22%3A%22Centres%20by%20Country%22%2C%22values%22%3Anull%2C%22categories%22%3Anull%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22key%20figure%22%2C%22filteredValues%22%3A%5B%5D%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23count%22%2C%22aggregateFunction%22%3A%22count%22%7D%2C%22dataTitle%22%3A%22%23count%22%2C%22displayCategory%22%3A%22Key%20Figures%22%2C%22unit%22%3Anull%2C%22hashCode%22%3A-542997807%2C%22title%22%3A%22Total%20Number%20of%20Centres%22%2C%22value%22%3Anull%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22chart%22%2C%22filteredValues%22%3A%5B%5D%2C%22swapAxis%22%3Atrue%2C%22showGrid%22%3Atrue%2C%22pieChart%22%3Afalse%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3A%22%23adm1%22%2C%22valueColumn%22%3A%22%23count%22%2C%22aggregateFunction%22%3A%22count%22%7D%2C%22dataTitle%22%3A%22Number%20of%20centres%22%2C%22displayCategory%22%3A%22Charts%22%2C%22hashCode%22%3A514356608%2C%22title%22%3A%22Centres%20by%20admin%201%20Level%22%2C%22values%22%3Anull%2C%22categories%22%3Anull%7D%5D%7D;sample=true',
        'https://tools.humdata.org/quickcharts/app/show;url=http%3A%2F%2Fdata.humdata.org%2Fdataset%2F019d1d0b-dc2f-4fa8-9355-fdc25da0ff4c%2Fresource%2F1f9bee15-3e3c-40fd-b205-935848d49f05%2Fdownload%2Finso-ngo-safety-security-incidents-jan-2016-to-july-2017.xlsx;embeddedConfig=%7B%22configVersion%22%3A2%2C%22bites%22%3A%5B%7B%22init%22%3Atrue%2C%22type%22%3A%22chart%22%2C%22filteredValues%22%3A%5B%5D%2C%22swapAxis%22%3Atrue%2C%22showGrid%22%3Atrue%2C%22pieChart%22%3Afalse%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3A%22%23country%22%2C%22valueColumn%22%3A%22%23affected%2Bkilled%2Bnational%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22%23affected%2Bkilled%2Bnational%22%2C%22displayCategory%22%3A%22Charts%22%2C%22hashCode%22%3A1532215041%2C%22title%22%3A%22Sum%20of%20National%20Staff%20Fatalities%20grouped%20by%20Country%22%2C%22values%22%3Anull%2C%22categories%22%3Anull%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22key%20figure%22%2C%22filteredValues%22%3A%5B%5D%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23affected%2Bkilled%2Bnational%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22%23affected%2Bkilled%2Bnational%22%2C%22displayCategory%22%3A%22Key%20Figures%22%2C%22unit%22%3Anull%2C%22hashCode%22%3A742068455%2C%22title%22%3A%22Sum%20of%20National%20Staff%20Fatalities%22%2C%22value%22%3Anull%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22timeseries%22%2C%22filteredValues%22%3A%5B%5D%2C%22swapAxis%22%3Atrue%2C%22showGrid%22%3Atrue%2C%22pieChart%22%3Afalse%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23affected%2Bkilled%2Bnational%22%2C%22aggregateFunction%22%3A%22sum%22%2C%22dateColumn%22%3A%22%23date%22%7D%2C%22dataTitle%22%3A%22%23affected%2Bkilled%2Bnational%22%2C%22displayCategory%22%3A%22Timeseries%22%2C%22hashCode%22%3A1204022792%2C%22title%22%3A%22Sum%20of%20National%20Staff%20Fatalities%22%2C%22values%22%3Anull%2C%22categories%22%3Anull%7D%5D%7D;sample=true',
        'https://tools.humdata.org/quickcharts/app/show;url=http%3A%2F%2Fdata.humdata.org%2Fdataset%2F5e60290d-0a82-48e2-9454-812b01c7d9d4%2Fresource%2F8a595340-6ba7-461a-a6ed-be99c160fe43%2Fdownload%2Ftcd_data_cod_ps_20170615.xlsx;embeddedConfig=%7B%22configVersion%22%3A2%2C%22bites%22%3A%5B%7B%22init%22%3Atrue%2C%22type%22%3A%22key%20figure%22%2C%22filteredValues%22%3A%5B%5D%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23inneed%2Brefugees%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22%23inneed%2Brefugees%22%2C%22displayCategory%22%3A%22Key%20Figures%22%2C%22unit%22%3A%22k%22%2C%22hashCode%22%3A-844904736%2C%22title%22%3A%22Total%20Refugees%22%2C%22value%22%3Anull%2C%22postText%22%3A%22people%22%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22key%20figure%22%2C%22filteredValues%22%3A%5B%5D%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23inneed%2Breturnees%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22%23inneed%2Breturnees%22%2C%22displayCategory%22%3A%22Key%20Figures%22%2C%22unit%22%3A%22k%22%2C%22hashCode%22%3A-871666863%2C%22title%22%3A%22Total%20Returnees%22%2C%22value%22%3Anull%2C%22postText%22%3A%22people%22%7D%2C%7B%22init%22%3Atrue%2C%22type%22%3A%22key%20figure%22%2C%22filteredValues%22%3A%5B%5D%2C%22ingredient%22%3A%7B%22aggregateColumn%22%3Anull%2C%22valueColumn%22%3A%22%23population%2Bestimated%2By2016%22%2C%22aggregateFunction%22%3A%22sum%22%7D%2C%22dataTitle%22%3A%22%23population%2Bestimated%2By2016%22%2C%22displayCategory%22%3A%22Key%20Figures%22%2C%22unit%22%3A%22mln%22%2C%22hashCode%22%3A1916088333%2C%22title%22%3A%22Projected%20Population%202016%22%2C%22value%22%3Anull%2C%22postText%22%3A%22people%22%2C%22description%22%3A%22Projected%20by%20UNFPA%20from%202009%20census%22%7D%5D%7D;sample=true'
    ];
    var datasetUrlMap = [
        'https://data.humdata.org/dataset/zika-cases-per-country-in-south-and-central-america',
        'https://data.humdata.org/dataset/madagascar-cyclone-enawo-needs-assessment-data-5-april',
        'https://data.humdata.org/dataset/ebola-west-africa-ebola-treatment-centres-isolation-wards-hospitals-and-transit-centres',
        'https://data.humdata.org/dataset/inso-key-data-dashboard',
        'https://data.humdata.org/dataset/population-statistics-of-chad-2017'
    ];

    var changeSelection = function(idx) {
        var iframeUrl = iframeUrlMap[idx];
        var datasetUrl = datasetUrlMap[idx];
        $("#quick-chart-iframe").attr("src", iframeUrl);
        $("#quick-chart-dataset").attr("href", datasetUrl);
    };

    $("#quick-chart-select").select2();
    $("#quick-chart-select").change(function(event) {
        var idx = this.value;
        changeSelection(idx);
    });

    changeSelection(0);

    var hash = window.location.hash;
    if (hash) {
        // $(hash).scrollTo();
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 2000);
    }
});
