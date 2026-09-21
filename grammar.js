/**
 * @file Tree-sitter grammars for parsing time lyrics files (.lrc extension).
 * @author pursvir
 * @license MIT
 */

export default grammar({
  name: "lrc",

  extras: $ => [],

  rules: {
    // TODO: header with ID tags
    source_file: $ => repeat(seq($.time_tag, $._eol)),

    header: $ => seq($.id_tag, $._eol),

    // TODO: each one of this must not be appeared more than once.
    id_tag: $ => choice(
      $.title_tag,
      $.artist_tag,
      $.album_tag,
      $.author_tag,
      $.lyricist_tag,
      $.length_tag,
      $.by_tag,
      $.offset_tag,
      $.tool_tag,
    ),

    title_tag: $ => seq("[", $.title_key, $.value, "]"),
    artist_tag: $ => seq("[", $.artist_key, $.value, "]"),
    album_tag: $ => seq("[", $.album_key, $.value, "]"),
    length_tag: $ => seq("[", $.length_key, $.length_value, "]"),
    lyricist_tag: $ => seq("[", $.lyricist_key, $.value, "]"),
    offset_tag: $ => seq("[", $.offset_key, $.offset_value, "]"),
    author_tag: $ => seq("[", $.author_key, $.value, "]"),
    tool_tag: $ => seq("[", $.tool_tag, $.value, "]"),
    by_tag: $ => seq("[", $.by_key, $.value, "]"),

    title_key: $ => "ti:",
    artist_key: $ => "ar:",
    length_key: $ => "length:",
    author_key: $ => "au:",
    tool_tag: $ => /^(?:re|tool):$/,
    album_key: $ => "al:",
    offset_key: $ => "offset:",
    by_key: $ => "by:",
    lyricist_key: $ => "lr:",

    value: $ => /.*/,
    length_value: $ => /\d{2}:\d{2}/,
    offset_value: $ => /[+-]\d+/,

    time_tag: $ => seq($.timestamp, $.lyrics),
    timestamp: $ => /\[\d{2}\:[0-5]\d\.\d{2}\]/,
    lyrics: $ => /.*/,

    comment: $ => /#.*/,
    _eol: ($) => /[ \t]*\r?\n/
  }
});
