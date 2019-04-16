'use babel';

import PrimeDevToolsView from './prime-dev-tools-view';
import { CompositeDisposable } from 'atom';

export default {

  primeDevToolsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.primeDevToolsView = new PrimeDevToolsView(state.primeDevToolsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.primeDevToolsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'prime-dev-tools:toggle': () => this.toggle(),
      'prime-dev-tools:assert_equal': () => this.assert_equal(),
      'prime-dev-tools:add_header': () => this.add_header(),
      'prime-dev-tools:new_class': () => this.new_class(),
      'prime-dev-tools:new_prime_service': () => this.new_prime_service(),
      'prime-dev-tools:new_unit_test': () => this.new_unit_test()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.primeDevToolsView.destroy();
  },

  serialize() {
    return {
      primeDevToolsViewState: this.primeDevToolsView.serialize()
    };
  },

  toggle() {
    console.log('PrimeDevTools was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  assert_equal() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let assertion = 'assert_equal(actual, expected)'
      editor.insertText(assertion)
    }
  },

  add_header() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let header = "# Copyright:: © " + new Date().getFullYear() + ", Dominion Enterprises. All Rights Reserved.\n\n"
      editor.insertText(header)
    }
  },

  new_class() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let class_string = "# Copyright:: © " + new Date().getFullYear() + ", Dominion Enterprises. All Rights Reserved.\n\n" +
        "class Something\n\n" +
        "end"
      editor.insertText(class_string)
    }
  },

  new_prime_service() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let prime_service = "# Copyright:: © " + new Date().getFullYear() + ", Dominion Enterprises. All Rights Reserved.\n\n" +
        "class Something < PrimeService\n" +
        "  attr_reader :stuff\n" +
        "\n" +
        "  def execute\n" +
        "\n" +
        "  end\n" +
        "\n" +
        "  private\n" +
        "\n" +
        "  def initialize_attributes(options)\n" +
        "\n" +
        "  end\n" +
        "end"
      editor.insertText(prime_service)
    }
  },

  new_unit_test() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let template = "require 'test_helper'\n\n" +
        "class SomethingTest < ActiveSupport::TestCase\n\n" +
        "end"
      editor.insertText(template)
    }
  }
};
