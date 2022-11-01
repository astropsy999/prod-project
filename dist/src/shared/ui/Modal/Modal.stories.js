var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/TemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';
export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};
var Template = function (args) { return _jsx(Modal, __assign({}, args)); };
export var Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consectetur corporis cum deserunt dignissimos dolore dolores eius eos esse est eum eveniet harum hic incidunt inventore ipsa iste iure magnam magni maxime nam nulla numquam officia quae quia quidem sint soluta suscipit, tempore ullam veniam vero vitae. Minima, repudiandae!\n',
};
export var Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque consectetur corporis cum deserunt dignissimos dolore dolores eius eos esse est eum eveniet harum hic incidunt inventore ipsa iste iure magnam magni maxime nam nulla numquam officia quae quia quidem sint soluta suscipit, tempore ullam veniam vero vitae. Minima, repudiandae!\n',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
