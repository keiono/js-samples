/**
 * Sample HTML5 page for network visualization with cytoscape.js
 *
 * @type {string}
 */

var NETWORK_DATA_URI = 'http://localhost:9988/v1/networks/galFiltered.sif.json';
var NETWORK_DATA_URI2 = 'data/galFiltered2.json';
var NETWORK_WINDOW_TAG = '#network-view';

$(function () {

    $.getJSON(NETWORK_DATA_URI2,
        function (jsonNetwork) {
            console.log(' --> # of CyNodes: ' + jsonNetwork.elements.nodes.length);
            console.log(' --> # of CyEdges: ' + jsonNetwork.elements.edges.length);
            drawNetwork(jsonNetwork);
        }
    );

    function drawNetwork(cyNetwork) {
        console.log('Drawing Network...');

        $(NETWORK_WINDOW_TAG)
            .cytoscape({
                elements: {
                    nodes: cyNetwork.elements.nodes,
                    edges: cyNetwork.elements.edges
                },

                style: cytoscape.stylesheet()
                    .selector("node")
                    .css({
                        "content": "data(name)",
                        "shape": "data(shape)",
                        "border-width": 2,
                        "background-color": "#DDD",
                        "border-color": "#129",
                        "opacity": "0.7"

                    })
                    .selector("edge")
                    .css({
                        "width": "mapData(weight, 0, 100, 1, 4)",
                        "target-arrow-shape": "triangle",
                        "source-arrow-shape": "circle",
                        "line-color": "#444",
                        "opacity": "0.7"
                    })
                    .selector(":selected")
                    .css({
                        "background-color": "#e99",
                        "line-color": "#e99",
                        "source-arrow-color": "#e99",
                        "target-arrow-color": "#e99",
                        "border-color": "#555",
                    })
                    .selector(".ui-cytoscape-edgehandles-source")
                    .css({
                        "border-color": "#5CC2ED",
                        "border-width": 3
                    })
                    .selector(".ui-cytoscape-edgehandles-target, node.ui-cytoscape-edgehandles-preview")
                    .css({
                        "background-color": "#5CC2ED"
                    })
                    .selector("edge.ui-cytoscape-edgehandles-preview")
                    .css({
                        "line-color": "#5CC2ED"
                    })
                    .selector("node.ui-cytoscape-edgehandles-preview, node.intermediate")
                    .css({
                        "shape": "rectangle",
                        "width": 15,
                        "height": 15
                    }),

                ready: function () {
                    window.cy = this;
                    cy.layout({ name: 'circular' });
                }
            });
    }
});

