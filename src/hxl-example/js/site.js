var tagsURL = 'https://proxy.hxlstandard.org/data.json?url=https%3A//docs.google.com/spreadsheets/d/1jpXwR8Ei-yy4Bcuh5qcprgBktFGgs943wUmL2ZccLto/edit%3Fusp%3Dsharing&strip-headers=on';

var tagsCall = $.ajax({
    type: 'GET',
    url: tagsURL,
    dataType: 'json',
});

var indexCall = $.ajax({
    type: 'GET',
    url: 'data/index_3560.json',
    dataType: 'json',
});

$('#taginst').on('mouseover click',function(){
    $('#hover').html('Click or tap a tag and see examples of it in use');
    $('#tags').slideDown();
});

$.when(tagsCall,indexCall).then(function(tagsArgs,indexArgs){
    var tags = hxlProxyToJSON(tagsArgs[0]);
    cats = [];
    console.log(tags);
    tags.forEach(function(t){
        if (cats.indexOf(t['#meta+category'])==-1) {
            cats.push(t['#meta+category']);
            $('#tags').append('<div id="'+t['#meta+category'].replace(',',' ').split(' ')[0]+'" class="tag_cat col-md-2 col-xs-4"><h4>' + t['#meta+category'] + '</h4></div>');
        }
        $('#'+t['#meta+category'].replace(',',' ').split(' ')[0]).append('<p id="'+t['#meta+tag'].substr(1)+'" class="tag">'+t['#meta+tag']+'</p>');
        $(t['#meta+tag']).on('click',function(){
            //window.location.search = $.query.set("tag", t['#meta+tag']);
            $('#tags').slideUp();
            $('#hover').html('Hover or tap here to select other tags');
            indextag = indexArgs[0][t['#meta+tag']];
            if(indextag){
                $('#tag').html(t['#meta+tag']);
                $('#tagdescription').html(t['#description']);
                var atts = [];
                for (var key in indextag.attributes){
                    atts.push({'key':key,'value':indextag.attributes[key]});
                }
                atts.sort(function(a,b){
                    return b.value-a.value;
                })
                $('#attributes').html('<h3>Commonly used Attributes<h3>');
                atts.forEach(function(a,i){
                    if(i<8){
                        $('#attributes').append('<p>+'+a.key+'</p>');
                    }
                });
                $('#samples').html('<h3>Examples</h3>');
                indextag.samples.forEach(function(s,i){
                    $.ajax({
                        type: 'GET',
                        url: 'data/'+s+'.json',
                        dataType: 'json',
                        success:function(response){
                            $('#samples').append('<div id="sample'+i+'"></div>');
                            $('#sample'+i).append('<h3>'+response.name+'</h3>');
                            var hdx = 'https://data.humdata.org/dataset/'+response.package_id;
                            $('#sample'+i).append('<p><a href="'+response.url+'">File Download</a> | <a href="'+hdx+'">HDX Page</a></p>');
                            $('#sample'+i).append('<div id="sampletablediv'+i+'" class="sampletable pre-scrollable"></div>');
                            $('#sampletablediv'+i).append('<table id="sampletable'+i+'"></table>');
                            response.data.forEach(function(r,j){
                                $('#sampletable'+i).append('<tr id="sampletable'+i+'row'+j+'" class="row'+j+'"></tr>');
                                r.forEach(function(c,k){
                                    cls = '';
                                    if(response.data[1][k]!=null && response.data[1][k].split('+')[0]==t['#meta+tag']){
                                        cls = 'highlight'+j;
                                    }
                                    if(c!=null && c.length>50){
                                        c=c.substr(0,50)+'...';
                                    }
                                    $('#sampletable'+i+'row'+j).append('<td class="'+cls+'">'+c+'</td>');
                                });
                            });
                        }
                    });
                });
            } else {
                $('#tag').html(t['#meta+tag']);
                $('#tagdescription').html(t['#description']);
                $('#samples').html('<p id="noexample">No Examples found tagged on HDX</p>');
                $('#attributes').html('');
            }
        });
    });
});

function hxlProxyToJSON(input){
    var output = [];
    var keys=[]
    input.forEach(function(e,i){
        if(i==0){
            e.forEach(function(e2,i2){
                var parts = e2.split('+');
                var key = parts[0]
                if(parts.length>1){
                    var atts = parts.splice(1,parts.length);
                    atts.sort();
                    atts.forEach(function(att){
                        key +='+'+att
                    });
                }
                keys.push(key);
            });
        } else {
            var row = {};
            e.forEach(function(e2,i2){
                row[keys[i2]] = e2;
            });
            output.push(row);
        }
    });
    return output;
}
