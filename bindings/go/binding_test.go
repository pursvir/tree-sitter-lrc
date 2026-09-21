package tree_sitter_lrc_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_lrc "github.com/pursvir/tree-sitter-lrc/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_lrc.Language())
	if language == nil {
		t.Errorf("Error loading Timed lyrics grammar")
	}
}
