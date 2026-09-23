/**
 * @file Tree-sitter grammars for parsing time lyrics files (.lrc extension).
 * @author pursvir
 * @license MIT
 */


export default grammar({
  name: "lrc",

  extras: $ => [],

  rules: {
    source_file: $ => seq(
      repeat(
        // NOTE: this permits ID tags to be under time tags!
        choice(
          seq(
            choice(
              $.title_tag,
              $.artist_tag,
              $.album_tag,
              $.author_tag,
              $.lyricist_tag,
              $.length_tag,
              $.by_tag,
              $.offset_tag,
              $.tool_tag,
            ), $._eol),
          seq($.time_tag, $._eol),
          $.comment,
          $._eol,
        ),
      )
    ),

    // ID tags
    title_tag: $ => seq("[", $.title_key, $.value, "]"),
    artist_tag: $ => seq("[", $.artist_key, $.value, "]"),
    album_tag: $ => seq("[", $.album_key, $.value, "]"),
    length_tag: $ => seq("[", $.length_key, $.length_value, "]"),
    lyricist_tag: $ => seq("[", $.lyricist_key, $.value, "]"),
    offset_tag: $ => seq("[", $.offset_key, $.offset_value, "]"),
    author_tag: $ => seq("[", $.author_key, $.value, "]"),
    tool_tag: $ => seq("[", $.tool_key, $.value, "]"),
    by_tag: $ => seq("[", $.by_key, $.value, "]"),

    time_tag: $ => seq("[", $.timestamp, "]", optional($.lyrics_part)),

    title_key: $ => "ti:",
    artist_key: $ => "ar:",
    length_key: $ => "length:",
    author_key: $ => "au:",
    tool_key: $ => choice("re:", "tool:"),
    album_key: $ => "al:",
    offset_key: $ => "offset:",
    by_key: $ => "by:",
    lyricist_key: $ => "lr:",

    value: $ => /[^\]\r\n]+/,
    length_value: $ => seq(optional($._spaces), /\d{2}:\d{2}/),
    offset_value: $ => seq(optional($._spaces), /[+-]\d+/),

    timestamp: $ => /\d{2}\:[0-5]\d\.\d{2,3}/,
    lyrics_part: $ => /[^\]\r\n]+/,

    comment: $ => /#[^\]\r\n]*/,
    _eol: $ => seq(optional($._spaces), /\r?\n/),
    _spaces: $ =>  /[ \t]+/,
  }
});
