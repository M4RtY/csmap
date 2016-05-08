(function ($) {

    var defaults = {
        map: "cz",
        onClick: function(kraj) {},
        onHover: function() {}
    }

	$.fn.csmap = function (options) {

        var options = $.extend(true, {}, defaults, options);

		if (options) {
			switch (options.map) {
				case 'cz':
					mapUrl = '/js/cz.json'
					break;
				case 'sk':
					mapUrl = '/js/sk.json'
					break;
			}
		}

		function createSVG(svgMap) {

			var xmlns = "http://www.w3.org/2000/svg";
			var boxWidth = "612";
			var boxHeight = "350";

			var svgElement = document.createElementNS(xmlns, "svg");

			svgElement.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
			svgElement.setAttributeNS(null, "id", "czechMap");
            svgElement.setAttributeNS (null, "preserveAspectRatio", "xMinYMin meet");
			svgElement.style.display = "block";

			$.getJSON(mapUrl, function (data) {
				$.each(data, function (idd, kraje) {
					$.each(kraje, function (id, d) {

						var svgKraj = document.createElementNS(xmlns, "path");

						svgKraj.setAttributeNS(null, "id", idd);
						svgKraj.setAttributeNS(null, "class", "kraj");
						svgKraj.setAttributeNS(null, "d", d);
						svgElement.appendChild(svgKraj);

						var svgContainer = document.getElementById(svgMap);
						svgContainer.appendChild(svgElement);

					});
				});
			});

		}

		var mapa = this;

        $(mapa).on("mouseover", ".kraj", function() {
            $(this).appendTo($(this).parent());

            options.onHover.call($(this));
        });

        $(mapa).on("click", ".kraj", function() {

            $(this).parent().find(".kraj").attr("class", "kraj");

            if( $(this).attr("class") != "kraj selected" ) {
                $(this).attr("class", "kraj selected");
            } else {
                $(this).attr("class", "kraj");
            }

            $(this).appendTo($(this).parent());

            options.onClick.call($(this));

        });

		mapa.each(function () {
			var mapa = this;
			createSVG($(this).attr("id"));
		});
	}
}(jQuery));