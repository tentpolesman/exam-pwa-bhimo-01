# Description

Dialog is components modal

### Properties
| Props       | Required | Default |  Description | Type |
| :---        | :---     | :---        | :---         |:---  |
| `open`      | `true`   | false       | boolean condition for show or hide dialog | `bool` |
| `title`     | `true`   | Title       | title of modal | `string` |
| `content`   | `false`  | false       | content of modal | `component` or `string` |
| `positiveLabel`   | `false`  | false | button label positive | `string` |
| `positiveAction`  | `false`  | false | button action positive | `function` |
| `positiveProps`   | `false`  | false | button props | `Button Props` |
| `negativeLabel`   | `false`  | false | button label negative | `string` |
| `negativeAction`  | `false`  | false | button action negative | `function` |
| `negativeProps`   | `false`  | false | button props | `Button Props` |

### How to use
```
window.dialog({
    open: true, // true or false
    title: 'sample',
    content: 'test content', // string or component
    negativeLabel: 'cancel',
    negativeAction: () => {
        window.dialog({open: false});
    },
    positiveLabel: 'submit',
    positiveAction: () => {
        console.log('submit');
    }
});
```

