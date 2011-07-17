all: 

.SECONDARY:
%.html: %.bemhtml.js %.css %.js
	@bem create block \
		-l pages/ \
		-t bem-bl/blocks-desktop/i-bem/bem/techs/html.js \
		$(basename $(@F))

%.bemhtml.js: %.deps.js
	@bem build \
		-l bem-bl/blocks-common/ \
		-l bem-bl/blocks-desktop/ \
		-l blocks/ \
		-d $(@D)/$(basename $(basename $(@F))).deps.js \
		-t bem-bl/blocks-desktop/i-bem/bem/techs/bemhtml.js \
		-o $(@D) \
		-n $(basename $(basename $(@F)))

%.deps.js: %.bemdecl.js
	@bem build \
		-l bem-bl/blocks-common/ \
		-l bem-bl/blocks-desktop/ \
		-l blocks/ \
		-d $(@D)/$(basename $(basename $(@F))).bemdecl.js \
		-t deps.js \
		-o $(@D) \
		-n $(basename $(basename $(@F)))

%.bemdecl.js:
	@bem build \
		-l bem-bl/blocks-common/ \
		-l bem-bl/blocks-desktop/ \
		-l blocks/ \
		-d $(@D)/$(basename $(basename $(@F))).bemjson.js \
		-t bemdecl.js \
		-o $(@D) \
		-n $(basename $(basename $(@F)))
%.css: %.deps.js
	@bem build \
		-l bem-bl/blocks-common/ \
		-l bem-bl/blocks-desktop/ \
		-l blocks/ \
		-d $(@D)/$(basename $(@F)).deps.js \
		-t css \
		-o $(@D) \
		-n $(basename $(@F))

%.js: %.deps.js
	@bem build \
		-l bem-bl/blocks-common/ \
		-l bem-bl/blocks-desktop/ \
		-l blocks/ \
		-d $(@D)/$(basename $(@F)).deps.js \
		-t js \
		-o $(@D) \
		-n $(basename $(@F))


get-bem-bl:
	git clone git://github.com/toivonen/bem-bl.git

.PHONY: get-bem-bl all FORCE
