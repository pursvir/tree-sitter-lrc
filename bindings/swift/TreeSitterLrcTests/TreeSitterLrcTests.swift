import XCTest
import SwiftTreeSitter
import TreeSitterLrc

final class TreeSitterLrcTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_lrc())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Timed lyrics grammar")
    }
}
