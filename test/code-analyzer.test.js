import assert from 'assert';
import {parseCode,task2,paintArray,paintCounter} from '../src/js/code-analyzer';
import * as escodegen from 'escodegen';

describe('The javascript parser', () => {
    let vector = {'x':1,'y':2,'z':3,'w':[24,48],'q':9};
    let afterParsedCode =
        parseCode('let t=5;\n' +
            'function foo(x, y, z, w, q){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    let d = w[1]+3;\n' +
            '    while(x<2){\n' +
            '\ta++;\n' +
            '\t}\n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '\telse if (w[0] < w[1]) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\telse {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}');
    let output= task2(afterParsedCode,vector);
    let lines=(escodegen.generate(output)).split('\n');


    it('function call', () => {
        assert.equal(
            lines[1],
            'function foo(x, y, z, w, q) {'
        );
    });

    it('global variables', () => {
        assert.equal(
            lines[0],
            'let t = 5;'
        );
    });

    it('while statement', () => {
        assert.equal(
            lines[2],
            '    while (x < 2) {'
        );
    });

    it('paint array', () => {
        assert.equal(
            '1',
            paintArray
        );
    });

    it('if statement', () => {
        assert.equal(
            '    if (((x + 1) + y) < z) {',
            lines[4]
        );
    });

    it('return statement', () => {
        assert.equal(
            '        return x + y + z + ((0) + 5);',
            lines[5]
        );
    });

    it('elseif statement', () => {
        assert.equal(
            '    } else if (((x + 1) + y) < z * 2) {',
            lines[6]
        );
    });

    it('else statement', () => {
        assert.equal(
            '    } else if (((x + 1) + y) < z * 2) {',
            lines[6]
        );
    });

    it('else statement with arrays', () => {
        assert.equal(
            '    } else if (w[0] < w[1]) {',
            lines[8]
        );
    });

    it('else return', () => {
        assert.equal(
            '        return x + y + z + c;',
            lines[13]
        );
    });
    /*it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a"},"init":{"type":"Literal","value":1,"raw":"1"}}],"kind":"let"}],"sourceType":"script"}'
        );
    });*/
});

