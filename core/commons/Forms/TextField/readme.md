# Description

TextField

## How To Use

**1. Import module to your component**
```node
import TextField from '@common_forms/TextField';
```

**2. Use the button component**

```node
<TextField value="value" onChange={() => {}} />
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| placeholder       | false    | the placeholder text | string |
| className       | false    | additional className for the textfield | string |
| value       | false    | value of the textfield | any |
| onChange       | false    | textfield onChange handler | func |
| label       | false    | label of the textfield | string |
| hintProps       | false    | set the props of the hint element | obj |
| hintProps.displayHintText       | false    | set to display the hint text, defaults to false | bool |
| hintProps.hintType       | false    | set the type of the hint, can choose from 'error', 'warning', 'success', and '', defaults to '' | string |
| hintProps.hintText       | false    | set the text of the hint | string |
| iconProps       | false    | set the props of button icon | obj |
| iconProps.leftIcon       | false    | name of the left icon, refer to https://fonts.google.com/icons | string |
| iconProps.leftIconClasses       | false    | additional classes for the left icon | string |
| iconProps.rightIcon       | false    | name of the right icon, refer to https://fonts.google.com/icons | string |
| iconProps.rightIconClasses       | false    | additional classes for the right icon | string |