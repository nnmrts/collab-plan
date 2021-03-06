(function()
{
	! function($, window)
	{
		return $.fn.hoverSlippery = function(options)
		{
			var defaults;
			return defaults = {
				bgColor: "#394264",
				speed: 300,
				radius: "5px",
				border: !1,
				borderColor: "#ff1464",
				borderTop: 0,
				borderStyle: "solid",
				borderWidth: "1px",
				borderTopLine: !1,
				twiceBorder: !1
			}, options = $.extend(defaults, options), this.each(function()
			{
				var $actionElement, $active, $defaultsBorderOptions, $slippery, $this;
				return $this = $(this), $defaultsBorderOptions = defaults.borderWidth + " " + defaults.borderStyle + " " + defaults.borderColor, $this.find("ul").append("<li class='slippery'></li>"), $active = $(".active"), $slippery = $this.find(".slippery"), $actionElement = $this.find("a"), $this.css(
				{
					position: "relative",
					display: "table"
				}), $this.find("li *").css(
				{
					position: "relative",
					"z-index": "2"
				}), $slippery.width($active.width()).height($this.height()).attr("heir__left", $active.find("a").position().left).attr("heir__width", $active.width()).css(
				{
					position: "absolute",
					top: 0,
					left: $active.find("a").position().left,
					"border-radius": defaults.radius
				}), defaults.border ? defaults.twiceBorder ? $slippery.css(
				{
					"border-radius": 0,
					"border-top": $defaultsBorderOptions,
					"border-bottom": $defaultsBorderOptions
				}) : defaults.underline ? $slippery.css(
				{
					"border-radius": 0,
					"border-bottom": $defaultsBorderOptions
				}) : defaults.overline ? $slippery.css(
				{
					"border-radius": 0,
					"border-top": $defaultsBorderOptions
				}) : $slippery.css(
				{
					backgroundColor: "none",
					"border-bottom": $defaultsBorderOptions,
					top: defaults.borderTop,
					borderRadius: 0
				}) : $slippery.css(
				{
					backgroundColor: defaults.bgColor
				}), $actionElement.click(function()
				{
					var $thisEl, $thisElParent, $thisElParentPosLeft;
					if ($thisEl = $(this), $thisElParent = $thisEl.parents("li"), $thisElParentPosLeft = $thisElParent.position().left, $thisElParentPosLeft !== $slippery.attr("heir__left")) return $this.find("li").each(function()
					{
						return $(this).removeClass("active"), $thisElParent.addClass("active")
					}), $slippery.attr("heir__left", $thisElParentPosLeft).attr("heir__width", $thisElParent.width())
				}), $actionElement.hover(function()
				{
					var $leftPos, $width;
					return $actionElement = $(this), $leftPos = $actionElement.position().left, $width = $actionElement.parent().width(), $slippery.stop().animate(
					{
						left: $leftPos,
						width: $width
					}, defaults.speed)
				}, function()
				{
					return $slippery.stop().animate(
					{
						left: $slippery.attr("heir__left"),
						width: $slippery.attr("heir__width")
					}, defaults.speed)
				})
			})
		}
	}(jQuery)
}).call(this);