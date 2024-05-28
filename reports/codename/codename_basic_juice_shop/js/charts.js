function index_to_shortname( index ){
    return ["common_directories","xst","common_files","insecure_cors_policy"][index];
}

function index_to_severity( index ){
    return {"common_directories":"medium","xst":"medium","common_files":"low","insecure_cors_policy":"low"}[index_to_shortname(index)];
}

function renderCharts() {
    if( window.renderedCharts )
    window.renderedCharts = true;

    c3.generate({
        bindto: '#chart-issues',
        data: {
            columns: [
                ["Trusted",1,1,1,1],
                ["Untrusted",0,0,0,0],
                ["Severity",3,3,2,2]
            ],
            axes: {
                Severity: 'y2'
            },
            type: 'bar',
            groups: [
                ['Trusted', 'Untrusted']
            ],
            types: {
                Severity: 'line'
            },
            onclick: function (d) {
                var location;

                if( d.name.toLowerCase() == 'severity' ) {
                    location = 'summary/issues/trusted/severity/' + index_to_severity(d.x);
                } else {
                    location = 'summary/issues/' + d.name.toLowerCase() + '/severity/' +
                        index_to_severity(d.x) + '/' + index_to_shortname(d.x);
                }

                goToLocation( location );
            }
        },
        regions: [{"class":"severity-medium","start":0,"end":1},{"class":"severity-low","start":2}],
        axis: {
            x: {
                type: 'category',
                categories: ["Common directory","HTTP TRACE","Common sensitive file","Insecure 'Access-Control-Allow-Origin' header"],
                tick: {
                    rotate: 15
                }
            },
            y: {
                label: {
                    text: 'Amount of logged issues',
                    position: 'outer-center'
                }
            },
            y2: {
                label: {
                    text: 'Severity',
                    position: 'outer-center'
                },
                show: true,
                type: 'category',
                categories: [1, 2, 3, 4],
                tick: {
                    format: function (d) {
                        return ["Informational","Low","Medium","High"][d - 1]
                    }
                }
            }
        },
        padding: {
            bottom: 40
        },
        color: {
            pattern: [ '#1f77b4', '#d62728', '#ff7f0e' ]
        }
    });

    c3.generate({
        bindto: '#chart-trust',
        data: {
            type: 'pie',
            columns: [["Trusted",4],["Untrusted",0]]
        },
        pie: {
            onclick: function (d) { goToLocation( 'summary/issues/' + d.id.toLowerCase() ) }
        },
        color: {
            pattern: [ '#1f77b4', '#d62728' ]
        }
    });

    c3.generate({
        bindto: '#chart-elements',
        data: {
            type: 'pie',
            columns: [["server",4]]
        }
    });

    c3.generate({
        bindto: '#chart-severities',
        data: {
            type: 'pie',
            columns: [["medium",2],["low",2]]
        },
        color: {
            pattern: [ '#d62728', '#ff7f0e', '#ffbb78', '#1f77b4' ]
        },
        pie: {
            onclick: function (d) {
                goToLocation( 'summary/issues/trusted/severity/' + d.id );
            }
        }
    });

}
