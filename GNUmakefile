all:: bem-bl
all:: $(patsubst %.bemjson.js,%.html,$(wildcard pages/*/*.bemjson.js))

.SECONDARY:
%.html: %.bemhtml.js %.css %.js
	@bem create block \
		-l pages/ \
		-t bem-bl/blocks-desktop/i-bem/bem/techs/html.js \
		$(*F)

BEM_BUILD=bem buld \
	-l bem-bl/blocks-common/ \
	-l bem-bl/blocks-desktop/ \
	-l blocks/ \
	-d $< \
	-t $1 \
	-o $(@D) \
	-n $(*F)

%.bemhtml.js: %.deps.js
	$(call BEM_BUILD,bem-bl/blocks-desktop/i-bem/bem/techs/bemhtml.js)

%.deps.js: %.bemdecl.js
	$(call BEM_BUILD,deps.js)

%.bemdecl.js: %.bemjson.js
	$(call BEM_BUILD,bemdecl.js) # TODO: bem create

%.css: %.deps.js
	$(call BEM_BUILD,css)

%.js: %.deps.js
	$(call BEM_BUILD,js)


DO_GIT=echo -- git $1 $2; \
	if [ -d $2 ]; \
		then \
			cd $2 && git pull origin master; \
		else \
			git clone $1.git $2; \
	fi

bem-bl:
	$(call DO_GIT,git://github.com/toivonen/bem-bl.git,$@)

.PHONY: all FORCE
