app.controller('OverlapCtrl', ($scope) => {

	$scope.data = [
		{"name":"meals.baked-falafel-burger.parsley","size":500,"imports":["meals.kofta-meatballs.parsely","meals.wild-rice-stuffing.parsely"]},
		{"name":"meals.baked-falafel-burger.sea-salt","size":500,"imports":["meals.kofta-meatballs.salt","meals.wild-rice-stuffing.sea-salt"]},
		{"name":"meals.baked-falafel-burger.cumin","size":500,"imports":["meals.kofta-meatballs.cumin"]},
		{"name":"meals.baked-falafel-burger.garlic","size":500,"imports":["meals.wild-rice-stuffing.garlic"]},
		{"name":"meals.baked-falafel-burger.lemon","size":500,"imports":["meals.kofta-meatballs.lemon-juice"]},
		{"name":"meals.baked-falafel-burger.chickpeas","size":500,"imports":[]},
		{"name":"meals.baked-falafel-burger.chili-garlic-sauce","size":500,"imports":[]},
		{"name":"meals.baked-falafel-burger.oat-flour","size":500,"imports":[]},
		{"name":"meals.baked-falafel-burger.tomato","size":500,"imports":[]},
		{"name":"meals.baked-falafel-burger.greens","size":500,"imports":[]},
		{"name":"meals.baked-falafel-burger.hummus","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.parsely","size":500,"imports":["meals.baked-falafel-burger.parsley","meals.wild-rice-stuffing.parsely"]},
		{"name":"meals.kofta-meatballs.salt","size":500,"imports":["meals.baked-falafel-burger.sea-salt","meals.wild-rice-stuffing.sea-salt"]},
		{"name":"meals.kofta-meatballs.cumin","size":500,"imports":["meals.baked-falafel-burger.cumin"]},
		{"name":"meals.kofta-meatballs.lemon-juice","size":500,"imports":["meals.baked-falafel-burger.lemon"]},
		{"name":"meals.kofta-meatballs.cinnamon","size":500,"imports":["meals.wild-rice-stuffing.cinnamon"]},
		{"name":"meals.kofta-meatballs.dried-cherries","size":500,"imports":["meals.wild-rice-stuffing.dried-cranberries"]},
		{"name":"meals.kofta-meatballs.allspice","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.fresh-mint","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.cloves","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.ground-lamb","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.honey","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.olive-oil","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.pepper","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.shallot","size":500,"imports":[]},
		{"name":"meals.kofta-meatballs.sparkling-water","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.parsely","size":500,"imports":["meals.baked-falafel-burger.parsley","meals.kofta-meatballs.parsely"]},
		{"name":"meals.wild-rice-stuffing.sea-salt","size":500,"imports":["meals.kofta-meatballs.salt","meals.baked-falafel-burger.sea-salt"]},
		{"name":"meals.wild-rice-stuffing.garlic","size":500,"imports":["meals.baked-falafel-burger.garlic"]},
		{"name":"meals.wild-rice-stuffing.cinnamon","size":500,"imports":["meals.kofta-meatballs.cinnamon"]},
		{"name":"meals.wild-rice-stuffing.dried-cranberries","size":500,"imports":["meals.kofta-meatballs.dried-cherries"]},
		{"name":"meals.wild-rice-stuffing.bosc-pear","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.butternut-squash","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.celery","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.coconut-oil","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.dried-oregano","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.dry-white-wine","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.orange-zest","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.pecans","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.wild-rice","size":500,"imports":[]},
		{"name":"meals.wild-rice-stuffing.yellow-onion","size":500,"imports":[]}
	];

	var diameter = 700,
	    radius = diameter / 2,
	    innerRadius = radius - 120;

	var cluster = d3.layout.cluster()
	    .size([360, innerRadius])
	    .sort(null)
	    .value(function(d) { return d.size; });

	var bundle = d3.layout.bundle();

	var line = d3.svg.line.radial()
	    .interpolate("bundle")
	    .tension(.85)
	    .radius(function(d) { return d.y; })
	    .angle(function(d) { return d.x / 180 * Math.PI; });

	var svg = d3.select("svg")
	    .attr("width", diameter)
	    .attr("height", diameter)
	  .append("g")
	    .attr("transform", "translate(" + radius + "," + radius + ")");

	var link = svg.append("g").selectAll(".link"),
	    node = svg.append("g").selectAll(".node");

	// link data
	  var nodes = cluster.nodes(packageHierarchy($scope.data)),
	      links = packageImports(nodes);

	  link = link
	      .data(bundle(links))
	    .enter().append("path")
	      .each(function(d) {ß
	      	d.source = d[0];
	      	d.target = d[d.length - 1]
	      })
	      .attr("class", "link")
	      .attr("d", line);

	  node = node
	      .data(nodes.filter(function(n) { return !n.children; }))
	    .enter().append("text")
	      .attr("class", "node")
	      .attr("dy", ".31em")
	      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
	      .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
	      .text(function(d) { return d.key; })
	      .on("mouseover", mouseovered)
	      .on("mouseout", mouseouted);


	function mouseovered(d) {
	  node
	      .each(function(n) { n.target = n.source = false; });

	  link
	      .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
	      .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
	    .filter(function(l) { return l.target === d || l.source === d; })
	      .each(function() { this.parentNode.appendChild(this); });

	  node
	      .classed("node--target", function(n) { return n.target; })
	      .classed("node--source", function(n) { return n.source; });
	}

	function mouseouted(d) {
	  link
	      .classed("link--target", false)
	      .classed("link--source", false);

	  node
	      .classed("node--target", false)
	      .classed("node--source", false);
	}

	d3.select(self.frameElement).style("height", diameter + "px");

	// Lazily construct the package hierarchy from class names.
	function packageHierarchy(classes) {
	  var map = {};

	  function find(name, data) {
	    var node = map[name], i;
	    if (!node) {
	      node = map[name] = data || {name: name, children: []};
	      if (name.length) {
	        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
	        node.parent.children.push(node);
	        node.key = name.substring(i + 1);
	      }
	    }
	    return node;
	  }

	  classes.forEach(function(d) {
	    find(d.name, d);
	  });

	  return map[""];
	}

	// Return a list of imports for the given array of nodes.
	function packageImports(nodes) {
	  var map = {},
	      imports = [];

	  // Compute a map from name to node.
	  nodes.forEach(function(d) {
	    map[d.name] = d;
	  });

	  // For each import, construct a link from the source to target node.
	  nodes.forEach(function(d) {
	    if (d.imports) d.imports.forEach(function(i) {
	      imports.push({source: map[d.name], target: map[i]});
	    });
	  });

	  return imports;
	}

});

/* eslint-disable */

