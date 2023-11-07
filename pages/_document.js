/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Html, Main } from 'next/document';
import HeadCustom from '@next_headcustom';
import NextScriptCustom from '@next_nextscriptcustom';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <HeadCustom />
                <body>
                    <Main />
                    <NextScriptCustom />
                </body>
            </Html>
        );
    }
}

// import _document from '@core_modules/theme/pages/_document';

// export default _document;
