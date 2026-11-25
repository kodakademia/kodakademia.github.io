self.onmessage = async ({data: {language, code, input}}) => {
  let output = '';
  function write(text) {
    if (output.length + text.length > 65536) throw new Error('A kimenet túl hosszú.');
    output += text;
  }
  try {
    if (language === 'python') {
      const base = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/';
      importScripts(base + 'skulpt.min.js', base + 'skulpt-stdlib.js');
      const lines = input.split(/\r?\n/);
      Sk.configure({
        __future__: Sk.python3, output: write,
        inputfun: prompt => {write(prompt || ''); return lines.shift() ?? ''},
        inputfunTakesPrompt: true,
        read: path => {
          if (!(path in Sk.builtinFiles.files)) throw new Error('Ismeretlen modul: ' + path);
          return Sk.builtinFiles.files[path];
        }
      });
      self.postMessage({ready:true});
      await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true));
    } else {
      importScripts('https://cdn.jsdelivr.net/gh/felixhao28/JSCPP@76e3534f04abf9c2547aa73ddca275e8935bed38/dist/JSCPP.es5.min.js');
      self.postMessage({ready:true});
      const reply = self.postMessage.bind(self);
      try {
        self.postMessage = message => {
          if (message.type === 'stdio.write') write(message.data);
          else if (message.err) throw new Error(message.msg);
          else if (message.data) write('\nKilépési kód: ' + message.data);
        };
        self.onmessage({data:[1, 'run', code, input]});
      } finally {
        self.postMessage = reply;
      }
    }
  } catch (error) {
    output += '\nHiba: ' + String(error);
  }
  self.postMessage({result:output});
};
