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



//make sure tags menu is not fixed on load
if ($(window).scrollTop() < ($('#header').outerHeight()+$('header').height())) {
    $('#tags').removeClass('affix');
}

// $('#taginst').on('mouseover click',function(){
//     $('#hover').html('Click or tap a tag and see examples of it in use');
//     $('#tags').slideDown();
// });

$.when(tagsCall,indexCall).then(function(tagsArgs,indexArgs){
    var tags = hxlProxyToJSON(tagsArgs[0]);
    cats = [];
    tags.forEach(function(t, index){
    	if (cats.indexOf(t['#meta+category'])==-1) {
    		cats.push(t['#meta+category']);
    		$('#tags').append('<div id="'+t['#meta+category'].replace(',',' ').split(' ')[0]+'" class="tag_cat"><h4>' + t['#meta+category'] + '</h4></div>');
    	}
    	$('#'+t['#meta+category'].replace(',',' ').split(' ')[0]).append('<p id="'+t['#meta+tag'].substr(1)+'" class="tag">'+t['#meta+tag']+'</p>');

        //print out all info for tags
    	//$(t['#meta+tag']).on('click',function(){
            //window.location.search = $.query.set("tag", t['#meta+tag']);
            //$('#tags').slideUp();
            //$('#hover').html('Hover or tap here to select other tags');
    		indextag = indexArgs[0][t['#meta+tag']];
            var currenttag = $('<div id="tag'+index+'"></div>');
            currenttag.append('<div class="overview"><h2 class="overview-tag"></h2><div class="tagdescription"></div><div class="attributes"></div></div>');
            currenttag.find('.overview-tag').html(t['#meta+tag']);
            currenttag.find('.tagdescription').html(t['#description']);
            $('#content').append(currenttag);

            if(indextag){
        		var atts = [];
        		for (var key in indextag.attributes){
        			atts.push({'key':key,'value':indextag.attributes[key]});
        		}
        		atts.sort(function(a,b){
        			return b.value-a.value;
        		})
        		currenttag.find('.attributes').html('<h5>Commonly used Attributes</h5>');
        		atts.forEach(function(a,i){
                    if(i<8){
        			     currenttag.find('.attributes').append('<p>+'+a.key+'</p>');
                    }
        		});
        		currenttag.append('<div class="samples"><h3>Examples</h3></div>');
        		indextag.samples.forEach(function(s,i){
        			$.ajax({
    				    type: 'GET',
    				    url: 'data/'+s+'.json',
    				    dataType: 'json',
    				    success:function(response){
    				    	currenttag.find('.samples').append('<div id="sample'+i+'"></div>');
    				    	currenttag.find('#sample'+i).append('<p class="sample-name">'+response.name+'</p>');
    				    	var hdx = 'https://data.humdata.org/dataset/'+response.package_id;
    				    	currenttag.find('#sample'+i).append('<p><a href="'+response.url+'">File Download</a> | <a href="'+hdx+'" target="_blank">HDX Page</a></p>');
    				    	currenttag.find('#sample'+i).append('<div id="sampletablediv'+i+'" class="sampletable"></div>');
    				    	currenttag.find('#sampletablediv'+i).append('<table id="sampletable'+i+'"></table>');
    				    	response.data.forEach(function(r,j){
    				    		currenttag.find('#sampletable'+i).append('<tr id="sampletable'+i+'row'+j+'" class="row'+j+'"></tr>');
    				    		r.forEach(function(c,k){
    				    			cls = '';
    				    			if(response.data[1][k]!=null && response.data[1][k].split('+')[0]==t['#meta+tag']){
    				    				cls = 'highlight'+j;
    				    			}
    				    			if(c!=null && c.length>50){
    				    				c=c.substr(0,50)+'...';
    				    			}
    				    			currenttag.find('#sampletable'+i+'row'+j).append('<td class="'+cls+'">'+c+'</td>');
    				    		});
    				    	});
    				    }
    				});
        		});
            } else {
                currenttag.append('<div class="samples"><h3>Examples</h3></div>');
                currenttag.find('.samples').html('<p id="noexample">No Examples found tagged on HDX</p>');
                currenttag.find('.attributes').html('');
            }
    	//});

        //define click event for each tag
        $(t['#meta+tag']).on('click',function(){
            var tag = $('#tag'+ index);
            $('html').animate({scrollTop: tag.offset().top-90}, 'slow');
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
