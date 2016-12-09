/**
 * Created by Milena on 09.12.2016.
 */


function draw_map() {

    d3.json("/get_projects", function (json) {
        datap = json;
        var costs = Object.keys(datap).map(function (key) {
            return datap[key]["costs_summa"];
        });
        var minValue = Math.min.apply(null, costs),
            maxValue = Math.max.apply(null, costs);
        var paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(["#D92662", "#660022"]);

        Object.keys(datap).forEach(function (keyl) {
                datap[keyl]["fillColor"] = paletteScale(datap[keyl]["costs_summa"]);
            }
        );


        new Datamap({
            element: document.getElementById('basic_choropleth'),
            fills: {defaultFill: '#E8E3E4'},
            data: datap,
            geographyConfig: {
                borderColor: '#4D4D4D',
                highlightBorderWidth: 1,
                highlightFillColor: function (geo) {
                    return geo['fillColor'] || '#F5F5F5';
                },
                highlightBorderColor: '#B7B7B7',
                popupTemplate: function (geo, data) {
                    if (!data) {
                        return;
                    }
                    var popup = ['<div class="hoverinfo">',
                        '<strong>', geo.properties.name, '</strong>',
                        '<br> total cost: <strong>', data.costs_summa, '</strong>',
                        '<br>',
                        '<br>'].join('');
                    (data.projects).forEach(function (item) {
                        popup = popup.concat(['<br> project_name: <strong>', item.project_name, '</strong><br> lendprojectcost: <strong>', item.lendprojectcost, '</strong>'].join(''))
                    });
                    popup = popup.concat('</div>');


                    return popup;
                }
            }

        });
    });


}
