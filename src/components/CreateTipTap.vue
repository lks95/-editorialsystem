<template>
<div>
    <WingHeader title="Projekte"/>
    <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" class="mb-3">
      <div class="menubar">

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.bold() }"
          @click="commands.bold"
        >
          <font-awesome-icon icon="bold" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.italic() }"
          @click="commands.italic"
        >
          <font-awesome-icon icon="italic" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.strike() }"
          @click="commands.strike"
        >
          <font-awesome-icon icon="strikethrough" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.underline() }"
          @click="commands.underline"
        >
          <font-awesome-icon icon="underline" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.code() }"
          @click="commands.code"
        >
          <font-awesome-icon icon="code" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <font-awesome-icon icon="paragraph" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.heading({ level: 4 }) }"
          @click="commands.heading({ level: 4 })"
        >
          H4
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.heading({ level: 5 }) }"
          @click="commands.heading({ level: 5 })"
        >
          H5
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <font-awesome-icon icon="list-ul" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <font-awesome-icon icon="list-ol" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <font-awesome-icon icon="quote-right" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          :class="{ 'active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <font-awesome-icon icon="code" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          @click="commands.horizontal_rule"
        >
          Hr
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          @click="commands.undo"
        >
          <font-awesome-icon icon="undo" />
        </b-button>

        <b-button
          variant="outline-secondary"
          size="sm"
          class="menubar__button mr-1"
          @click="commands.redo"
        >
          <font-awesome-icon icon="redo" />
        </b-button>

      </div>
    </editor-menu-bar>

    <editor-content class="editor__content border p-2" :editor="editor"/>
  </div>
</div>
</template>

<script>
import WingHeader from '../components/WingHeader'
import axios from 'axios'

import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  name: 'Projekte',
  components: {
    EditorContent,
    EditorMenuBar,
    WingHeader
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3, 4, 5] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: "",
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  mounted() {
    axios.get("./data/projects.json").then(
      response =>{
        this.editor.setContent(response.data.projects[5].detail_text)
      }
    );
  }
}
</script>
