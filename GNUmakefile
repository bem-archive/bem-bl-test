.DEFAULT_GOAL := all
BEM := ./node_modules/.bin/bem

ifneq (,$(findstring B,$(MAKEFLAGS)))
BEM_FLAGS := --force
endif

%::
	$(if $(findstring GNUmakefile,$@),,$(BEM) make $@ $(BEM_FLAGS))

.PHONY: clean
clean::
	$(BEM) make -m clean
