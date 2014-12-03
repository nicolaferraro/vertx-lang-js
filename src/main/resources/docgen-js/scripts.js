function renderSource(elt, source) {

    // A bit twisted at the moment due to classloading issues but that works
    var type = java.lang.Thread.currentThread().getContextClassLoader().loadClass("io.vertx.codetrans.CodeTranslator");
    var type2 = java.lang.Thread.currentThread().getContextClassLoader().loadClass("io.vertx.codetrans.JavaScriptLang");
    var JArray = Java.type("java.lang.Object[]");
    var arr = new JArray(1);
    arr[0] = processingEnv;
    var translator = type.getConstructors()[0].newInstance(arr);
    var lang = type2.newInstance();
    try {
        var translation = translator.translate(elt, lang);
        return translation
    } catch (Err) {
        java.lang.System.out.println("Cannot generate: " + elt);
        return "todo";
    }
}

function toTypeLink(elt) {
    return "jsdoc/symbols/" + elt.getSimpleName() + ".html";
}

function toMethodLink(elt) {
    var typeElt = elt.getEnclosingElement();
    return toTypeLink(typeElt) + '#' + elt.getSimpleName().toString();
}

function toConstructorLink(elt) {
    return "todo";
}

function toFieldLink(elt) {
    return "todo";
}