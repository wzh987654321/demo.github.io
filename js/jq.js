/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */
;(function (b, a) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = b.document
      ? a(b, true)
      : function (c) {
          if (!c.document) {
            throw new Error('jQuery requires a window with a document')
          }
          return a(c)
        }
  } else {
    a(b)
  }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
  var arr = []
  var slice = arr.slice
  var concat = arr.concat
  var push = arr.push
  var indexOf = arr.indexOf
  var class2type = {}
  var toString = class2type.toString
  var hasOwn = class2type.hasOwnProperty
  var support = {}
  var document = window.document,
    version = '2.1.4',
    jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context)
    },
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    fcamelCase = function (all, letter) {
      return letter.toUpperCase()
    }
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    selector: '',
    length: 0,
    toArray: function () {
      return slice.call(this)
    },
    get: function (num) {
      return num != null
        ? num < 0
          ? this[num + this.length]
          : this[num]
        : slice.call(this)
    },
    pushStack: function (elems) {
      var ret = jQuery.merge(this.constructor(), elems)
      ret.prevObject = this
      ret.context = this.context
      return ret
    },
    each: function (callback, args) {
      return jQuery.each(this, callback, args)
    },
    map: function (callback) {
      return this.pushStack(
        jQuery.map(this, function (elem, i) {
          return callback.call(elem, i, elem)
        })
      )
    },
    slice: function () {
      return this.pushStack(slice.apply(this, arguments))
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(-1)
    },
    eq: function (i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0)
      return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
    },
    end: function () {
      return this.prevObject || this.constructor(null)
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice
  }
  jQuery.extend = jQuery.fn.extend = function () {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false
    if (typeof target === 'boolean') {
      deep = target
      target = arguments[i] || {}
      i++
    }
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {}
    }
    if (i === length) {
      target = this
      i--
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name]
          copy = options[name]
          if (target === copy) {
            continue
          }
          if (
            deep &&
            copy &&
            (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))
          ) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && jQuery.isArray(src) ? src : []
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {}
            }
            target[name] = jQuery.extend(deep, clone, copy)
          } else {
            if (copy !== undefined) {
              target[name] = copy
            }
          }
        }
      }
    }
    return target
  }
  jQuery.extend({
    expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),
    isReady: true,
    error: function (msg) {
      throw new Error(msg)
    },
    noop: function () {},
    isFunction: function (obj) {
      return jQuery.type(obj) === 'function'
    },
    isArray: Array.isArray,
    isWindow: function (obj) {
      return obj != null && obj === obj.window
    },
    isNumeric: function (obj) {
      return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0
    },
    isPlainObject: function (obj) {
      if (
        jQuery.type(obj) !== 'object' ||
        obj.nodeType ||
        jQuery.isWindow(obj)
      ) {
        return false
      }
      if (
        obj.constructor &&
        !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')
      ) {
        return false
      }
      return true
    },
    isEmptyObject: function (obj) {
      var name
      for (name in obj) {
        return false
      }
      return true
    },
    type: function (obj) {
      if (obj == null) {
        return obj + ''
      }
      return typeof obj === 'object' || typeof obj === 'function'
        ? class2type[toString.call(obj)] || 'object'
        : typeof obj
    },
    globalEval: function (code) {
      var script,
        indirect = eval
      code = jQuery.trim(code)
      if (code) {
        if (code.indexOf('use strict') === 1) {
          script = document.createElement('script')
          script.text = code
          document.head.appendChild(script).parentNode.removeChild(script)
        } else {
          indirect(code)
        }
      }
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase)
    },
    nodeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
    },
    each: function (obj, callback, args) {
      var value,
        i = 0,
        length = obj.length,
        isArray = isArraylike(obj)
      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args)
            if (value === false) {
              break
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args)
            if (value === false) {
              break
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i])
            if (value === false) {
              break
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i])
            if (value === false) {
              break
            }
          }
        }
      }
      return obj
    },
    trim: function (text) {
      return text == null ? '' : (text + '').replace(rtrim, '')
    },
    makeArray: function (arr, results) {
      var ret = results || []
      if (arr != null) {
        if (isArraylike(Object(arr))) {
          jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr)
        } else {
          push.call(ret, arr)
        }
      }
      return ret
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i)
    },
    merge: function (first, second) {
      var len = +second.length,
        j = 0,
        i = first.length
      for (; j < len; j++) {
        first[i++] = second[j]
      }
      first.length = i
      return first
    },
    grep: function (elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i)
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i])
        }
      }
      return matches
    },
    map: function (elems, callback, arg) {
      var value,
        i = 0,
        length = elems.length,
        isArray = isArraylike(elems),
        ret = []
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg)
          if (value != null) {
            ret.push(value)
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg)
          if (value != null) {
            ret.push(value)
          }
        }
      }
      return concat.apply([], ret)
    },
    guid: 1,
    proxy: function (fn, context) {
      var tmp, args, proxy
      if (typeof context === 'string') {
        tmp = fn[context]
        context = fn
        fn = tmp
      }
      if (!jQuery.isFunction(fn)) {
        return undefined
      }
      args = slice.call(arguments, 2)
      proxy = function () {
        return fn.apply(context || this, args.concat(slice.call(arguments)))
      }
      proxy.guid = fn.guid = fn.guid || jQuery.guid++
      return proxy
    },
    now: Date.now,
    support: support
  })
  jQuery.each(
    'Boolean Number String Function Array Date RegExp Object Error'.split(' '),
    function (i, name) {
      class2type['[object ' + name + ']'] = name.toLowerCase()
    }
  )

  function isArraylike (obj) {
    var length = 'length' in obj && obj.length,
      type = jQuery.type(obj)
    if (type === 'function' || jQuery.isWindow(obj)) {
      return false
    }
    if (obj.nodeType === 1 && length) {
      return true
    }
    return (
      type === 'array' ||
      length === 0 ||
      (typeof length === 'number' && length > 0 && length - 1 in obj)
    )
  }
  var Sizzle =
    /*!
     * Sizzle CSS Selector Engine v2.2.0-pre
     * http://sizzlejs.com/
     *
     * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2014-12-16
     */
    (function (window) {
      var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
        expando = 'sizzle' + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        sortOrder = function (a, b) {
          if (a === b) {
            hasDuplicate = true
          }
          return 0
        },
        MAX_NEGATIVE = 1 << 31,
        hasOwn = {}.hasOwnProperty,
        arr = [],
        pop = arr.pop,
        push_native = arr.push,
        push = arr.push,
        slice = arr.slice,
        indexOf = function (list, elem) {
          var i = 0,
            len = list.length
          for (; i < len; i++) {
            if (list[i] === elem) {
              return i
            }
          }
          return -1
        },
        booleans =
          'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
        whitespace = '[\\x20\\t\\r\\n\\f]',
        characterEncoding = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
        identifier = characterEncoding.replace('w', 'w#'),
        attributes =
          '\\[' +
          whitespace +
          '*(' +
          characterEncoding +
          ')(?:' +
          whitespace +
          '*([*^$|!~]?=)' +
          whitespace +
          '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
          identifier +
          '))|)' +
          whitespace +
          '*\\]',
        pseudos =
          ':(' +
          characterEncoding +
          ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
          attributes +
          ')*)|.*)\\)|)',
        rwhitespace = new RegExp(whitespace + '+', 'g'),
        rtrim = new RegExp(
          '^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$',
          'g'
        ),
        rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'),
        rcombinators = new RegExp(
          '^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'
        ),
        rattributeQuotes = new RegExp(
          '=' + whitespace + '*([^\\]\'"]*?)' + whitespace + '*\\]',
          'g'
        ),
        rpseudo = new RegExp(pseudos),
        ridentifier = new RegExp('^' + identifier + '$'),
        matchExpr = {
          ID: new RegExp('^#(' + characterEncoding + ')'),
          CLASS: new RegExp('^\\.(' + characterEncoding + ')'),
          TAG: new RegExp('^(' + characterEncoding.replace('w', 'w*') + ')'),
          ATTR: new RegExp('^' + attributes),
          PSEUDO: new RegExp('^' + pseudos),
          CHILD: new RegExp(
            '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
              whitespace +
              '*(even|odd|(([+-]|)(\\d*)n|)' +
              whitespace +
              '*(?:([+-]|)' +
              whitespace +
              '*(\\d+)|))' +
              whitespace +
              '*\\)|)',
            'i'
          ),
          bool: new RegExp('^(?:' + booleans + ')$', 'i'),
          needsContext: new RegExp(
            '^' +
              whitespace +
              '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
              whitespace +
              '*((?:-\\d)?\\d*)' +
              whitespace +
              '*\\)|)(?=[^-]|$)',
            'i'
          )
        },
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
        rnative = /^[^{]+\{\s*\[native \w/,
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        rsibling = /[+~]/,
        rescape = /'|\\/g,
        runescape = new RegExp(
          '\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)',
          'ig'
        ),
        funescape = function (_, escaped, escapedWhitespace) {
          var high = '0x' + escaped - 65536
          return high !== high || escapedWhitespace
            ? escaped
            : high < 0
            ? String.fromCharCode(high + 65536)
            : String.fromCharCode((high >> 10) | 55296, (high & 1023) | 56320)
        },
        unloadHandler = function () {
          setDocument()
        }
      try {
        push.apply(
          (arr = slice.call(preferredDoc.childNodes)),
          preferredDoc.childNodes
        )
        arr[preferredDoc.childNodes.length].nodeType
      } catch (e) {
        push = {
          apply: arr.length
            ? function (target, els) {
                push_native.apply(target, slice.call(els))
              }
            : function (target, els) {
                var j = target.length,
                  i = 0
                while ((target[j++] = els[i++])) {}
                target.length = j - 1
              }
        }
      }

      function Sizzle (selector, context, results, seed) {
        var match,
          elem,
          m,
          nodeType,
          i,
          groups,
          old,
          nid,
          newContext,
          newSelector
        if (
          (context ? context.ownerDocument || context : preferredDoc) !==
          document
        ) {
          setDocument(context)
        }
        context = context || document
        results = results || []
        nodeType = context.nodeType
        if (
          typeof selector !== 'string' ||
          !selector ||
          (nodeType !== 1 && nodeType !== 9 && nodeType !== 11)
        ) {
          return results
        }
        if (!seed && documentIsHTML) {
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            if ((m = match[1])) {
              if (nodeType === 9) {
                elem = context.getElementById(m)
                if (elem && elem.parentNode) {
                  if (elem.id === m) {
                    results.push(elem)
                    return results
                  }
                } else {
                  return results
                }
              } else {
                if (
                  context.ownerDocument &&
                  (elem = context.ownerDocument.getElementById(m)) &&
                  contains(context, elem) &&
                  elem.id === m
                ) {
                  results.push(elem)
                  return results
                }
              }
            } else {
              if (match[2]) {
                push.apply(results, context.getElementsByTagName(selector))
                return results
              } else {
                if ((m = match[3]) && support.getElementsByClassName) {
                  push.apply(results, context.getElementsByClassName(m))
                  return results
                }
              }
            }
          }
          if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            nid = old = expando
            newContext = context
            newSelector = nodeType !== 1 && selector
            if (nodeType === 1 && context.nodeName.toLowerCase() !== 'object') {
              groups = tokenize(selector)
              if ((old = context.getAttribute('id'))) {
                nid = old.replace(rescape, '\\$&')
              } else {
                context.setAttribute('id', nid)
              }
              nid = "[id='" + nid + "'] "
              i = groups.length
              while (i--) {
                groups[i] = nid + toSelector(groups[i])
              }
              newContext =
                (rsibling.test(selector) && testContext(context.parentNode)) ||
                context
              newSelector = groups.join(',')
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector))
                return results
              } catch (qsaError) {
              } finally {
                if (!old) {
                  context.removeAttribute('id')
                }
              }
            }
          }
        }
        return select(selector.replace(rtrim, '$1'), context, results, seed)
      }

      function createCache () {
        var keys = []

        function cache (key, value) {
          if (keys.push(key + ' ') > Expr.cacheLength) {
            delete cache[keys.shift()]
          }
          return (cache[key + ' '] = value)
        }
        return cache
      }

      function markFunction (fn) {
        fn[expando] = true
        return fn
      }

      function assert (fn) {
        var div = document.createElement('div')
        try {
          return !!fn(div)
        } catch (e) {
          return false
        } finally {
          if (div.parentNode) {
            div.parentNode.removeChild(div)
          }
          div = null
        }
      }

      function addHandle (attrs, handler) {
        var arr = attrs.split('|'),
          i = attrs.length
        while (i--) {
          Expr.attrHandle[arr[i]] = handler
        }
      }

      function siblingCheck (a, b) {
        var cur = b && a,
          diff =
            cur &&
            a.nodeType === 1 &&
            b.nodeType === 1 &&
            (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE)
        if (diff) {
          return diff
        }
        if (cur) {
          while ((cur = cur.nextSibling)) {
            if (cur === b) {
              return -1
            }
          }
        }
        return a ? 1 : -1
      }

      function createInputPseudo (type) {
        return function (elem) {
          var name = elem.nodeName.toLowerCase()
          return name === 'input' && elem.type === type
        }
      }

      function createButtonPseudo (type) {
        return function (elem) {
          var name = elem.nodeName.toLowerCase()
          return (name === 'input' || name === 'button') && elem.type === type
        }
      }

      function createPositionalPseudo (fn) {
        return markFunction(function (argument) {
          argument = +argument
          return markFunction(function (seed, matches) {
            var j,
              matchIndexes = fn([], seed.length, argument),
              i = matchIndexes.length
            while (i--) {
              if (seed[(j = matchIndexes[i])]) {
                seed[j] = !(matches[j] = seed[j])
              }
            }
          })
        })
      }

      function testContext (context) {
        return (
          context &&
          typeof context.getElementsByTagName !== 'undefined' &&
          context
        )
      }
      support = Sizzle.support = {}
      isXML = Sizzle.isXML = function (elem) {
        var documentElement =
          elem && (elem.ownerDocument || elem).documentElement
        return documentElement ? documentElement.nodeName !== 'HTML' : false
      }
      setDocument = Sizzle.setDocument = function (node) {
        var hasCompare,
          parent,
          doc = node ? node.ownerDocument || node : preferredDoc
        if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
          return document
        }
        document = doc
        docElem = doc.documentElement
        parent = doc.defaultView
        if (parent && parent !== parent.top) {
          if (parent.addEventListener) {
            parent.addEventListener('unload', unloadHandler, false)
          } else {
            if (parent.attachEvent) {
              parent.attachEvent('onunload', unloadHandler)
            }
          }
        }
        documentIsHTML = !isXML(doc)
        support.attributes = assert(function (div) {
          div.className = 'i'
          return !div.getAttribute('className')
        })
        support.getElementsByTagName = assert(function (div) {
          div.appendChild(doc.createComment(''))
          return !div.getElementsByTagName('*').length
        })
        support.getElementsByClassName = rnative.test(
          doc.getElementsByClassName
        )
        support.getById = assert(function (div) {
          docElem.appendChild(div).id = expando
          return (
            !doc.getElementsByName || !doc.getElementsByName(expando).length
          )
        })
        if (support.getById) {
          Expr.find.ID = function (id, context) {
            if (
              typeof context.getElementById !== 'undefined' &&
              documentIsHTML
            ) {
              var m = context.getElementById(id)
              return m && m.parentNode ? [m] : []
            }
          }
          Expr.filter.ID = function (id) {
            var attrId = id.replace(runescape, funescape)
            return function (elem) {
              return elem.getAttribute('id') === attrId
            }
          }
        } else {
          delete Expr.find.ID
          Expr.filter.ID = function (id) {
            var attrId = id.replace(runescape, funescape)
            return function (elem) {
              var node =
                typeof elem.getAttributeNode !== 'undefined' &&
                elem.getAttributeNode('id')
              return node && node.value === attrId
            }
          }
        }
        Expr.find.TAG = support.getElementsByTagName
          ? function (tag, context) {
              if (typeof context.getElementsByTagName !== 'undefined') {
                return context.getElementsByTagName(tag)
              } else {
                if (support.qsa) {
                  return context.querySelectorAll(tag)
                }
              }
            }
          : function (tag, context) {
              var elem,
                tmp = [],
                i = 0,
                results = context.getElementsByTagName(tag)
              if (tag === '*') {
                while ((elem = results[i++])) {
                  if (elem.nodeType === 1) {
                    tmp.push(elem)
                  }
                }
                return tmp
              }
              return results
            }
        Expr.find.CLASS =
          support.getElementsByClassName &&
          function (className, context) {
            if (documentIsHTML) {
              return context.getElementsByClassName(className)
            }
          }
        rbuggyMatches = []
        rbuggyQSA = []
        if ((support.qsa = rnative.test(doc.querySelectorAll))) {
          assert(function (div) {
            docElem.appendChild(div).innerHTML =
              "<a id='" +
              expando +
              "'></a><select id='" +
              expando +
              "-\f]' msallowcapture=''><option selected=''></option></select>"
            if (div.querySelectorAll("[msallowcapture^='']").length) {
              rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")')
            }
            if (!div.querySelectorAll('[selected]').length) {
              rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')')
            }
            if (!div.querySelectorAll('[id~=' + expando + '-]').length) {
              rbuggyQSA.push('~=')
            }
            if (!div.querySelectorAll(':checked').length) {
              rbuggyQSA.push(':checked')
            }
            if (!div.querySelectorAll('a#' + expando + '+*').length) {
              rbuggyQSA.push('.#.+[+~]')
            }
          })
          assert(function (div) {
            var input = doc.createElement('input')
            input.setAttribute('type', 'hidden')
            div.appendChild(input).setAttribute('name', 'D')
            if (div.querySelectorAll('[name=d]').length) {
              rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=')
            }
            if (!div.querySelectorAll(':enabled').length) {
              rbuggyQSA.push(':enabled', ':disabled')
            }
            div.querySelectorAll('*,:x')
            rbuggyQSA.push(',.*:')
          })
        }
        if (
          (support.matchesSelector = rnative.test(
            (matches =
              docElem.matches ||
              docElem.webkitMatchesSelector ||
              docElem.mozMatchesSelector ||
              docElem.oMatchesSelector ||
              docElem.msMatchesSelector)
          ))
        ) {
          assert(function (div) {
            support.disconnectedMatch = matches.call(div, 'div')
            matches.call(div, "[s!='']:x")
            rbuggyMatches.push('!=', pseudos)
          })
        }
        rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'))
        rbuggyMatches =
          rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'))
        hasCompare = rnative.test(docElem.compareDocumentPosition)
        contains =
          hasCompare || rnative.test(docElem.contains)
            ? function (a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                  bup = b && b.parentNode
                return (
                  a === bup ||
                  !!(
                    bup &&
                    bup.nodeType === 1 &&
                    (adown.contains
                      ? adown.contains(bup)
                      : a.compareDocumentPosition &&
                        a.compareDocumentPosition(bup) & 16)
                  )
                )
              }
            : function (a, b) {
                if (b) {
                  while ((b = b.parentNode)) {
                    if (b === a) {
                      return true
                    }
                  }
                }
                return false
              }
        sortOrder = hasCompare
          ? function (a, b) {
              if (a === b) {
                hasDuplicate = true
                return 0
              }
              var compare =
                !a.compareDocumentPosition - !b.compareDocumentPosition
              if (compare) {
                return compare
              }
              compare =
                (a.ownerDocument || a) === (b.ownerDocument || b)
                  ? a.compareDocumentPosition(b)
                  : 1
              if (
                compare & 1 ||
                (!support.sortDetached &&
                  b.compareDocumentPosition(a) === compare)
              ) {
                if (
                  a === doc ||
                  (a.ownerDocument === preferredDoc &&
                    contains(preferredDoc, a))
                ) {
                  return -1
                }
                if (
                  b === doc ||
                  (b.ownerDocument === preferredDoc &&
                    contains(preferredDoc, b))
                ) {
                  return 1
                }
                return sortInput
                  ? indexOf(sortInput, a) - indexOf(sortInput, b)
                  : 0
              }
              return compare & 4 ? -1 : 1
            }
          : function (a, b) {
              if (a === b) {
                hasDuplicate = true
                return 0
              }
              var cur,
                i = 0,
                aup = a.parentNode,
                bup = b.parentNode,
                ap = [a],
                bp = [b]
              if (!aup || !bup) {
                return a === doc
                  ? -1
                  : b === doc
                  ? 1
                  : aup
                  ? -1
                  : bup
                  ? 1
                  : sortInput
                  ? indexOf(sortInput, a) - indexOf(sortInput, b)
                  : 0
              } else {
                if (aup === bup) {
                  return siblingCheck(a, b)
                }
              }
              cur = a
              while ((cur = cur.parentNode)) {
                ap.unshift(cur)
              }
              cur = b
              while ((cur = cur.parentNode)) {
                bp.unshift(cur)
              }
              while (ap[i] === bp[i]) {
                i++
              }
              return i
                ? siblingCheck(ap[i], bp[i])
                : ap[i] === preferredDoc
                ? -1
                : bp[i] === preferredDoc
                ? 1
                : 0
            }
        return doc
      }
      Sizzle.matches = function (expr, elements) {
        return Sizzle(expr, null, null, elements)
      }
      Sizzle.matchesSelector = function (elem, expr) {
        if ((elem.ownerDocument || elem) !== document) {
          setDocument(elem)
        }
        expr = expr.replace(rattributeQuotes, "='$1']")
        if (
          support.matchesSelector &&
          documentIsHTML &&
          (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
          (!rbuggyQSA || !rbuggyQSA.test(expr))
        ) {
          try {
            var ret = matches.call(elem, expr)
            if (
              ret ||
              support.disconnectedMatch ||
              (elem.document && elem.document.nodeType !== 11)
            ) {
              return ret
            }
          } catch (e) {}
        }
        return Sizzle(expr, document, null, [elem]).length > 0
      }
      Sizzle.contains = function (context, elem) {
        if ((context.ownerDocument || context) !== document) {
          setDocument(context)
        }
        return contains(context, elem)
      }
      Sizzle.attr = function (elem, name) {
        if ((elem.ownerDocument || elem) !== document) {
          setDocument(elem)
        }
        var fn = Expr.attrHandle[name.toLowerCase()],
          val =
            fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
              ? fn(elem, name, !documentIsHTML)
              : undefined
        return val !== undefined
          ? val
          : support.attributes || !documentIsHTML
          ? elem.getAttribute(name)
          : (val = elem.getAttributeNode(name)) && val.specified
          ? val.value
          : null
      }
      Sizzle.error = function (msg) {
        throw new Error('Syntax error, unrecognized expression: ' + msg)
      }
      Sizzle.uniqueSort = function (results) {
        var elem,
          duplicates = [],
          j = 0,
          i = 0
        hasDuplicate = !support.detectDuplicates
        sortInput = !support.sortStable && results.slice(0)
        results.sort(sortOrder)
        if (hasDuplicate) {
          while ((elem = results[i++])) {
            if (elem === results[i]) {
              j = duplicates.push(i)
            }
          }
          while (j--) {
            results.splice(duplicates[j], 1)
          }
        }
        sortInput = null
        return results
      }
      getText = Sizzle.getText = function (elem) {
        var node,
          ret = '',
          i = 0,
          nodeType = elem.nodeType
        if (!nodeType) {
          while ((node = elem[i++])) {
            ret += getText(node)
          }
        } else {
          if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === 'string') {
              return elem.textContent
            } else {
              for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                ret += getText(elem)
              }
            }
          } else {
            if (nodeType === 3 || nodeType === 4) {
              return elem.nodeValue
            }
          }
        }
        return ret
      }
      Expr = Sizzle.selectors = {
        cacheLength: 50,
        createPseudo: markFunction,
        match: matchExpr,
        attrHandle: {},
        find: {},
        relative: {
          '>': {
            dir: 'parentNode',
            first: true
          },
          ' ': {
            dir: 'parentNode'
          },
          '+': {
            dir: 'previousSibling',
            first: true
          },
          '~': {
            dir: 'previousSibling'
          }
        },
        preFilter: {
          ATTR: function (match) {
            match[1] = match[1].replace(runescape, funescape)
            match[3] = (match[3] || match[4] || match[5] || '').replace(
              runescape,
              funescape
            )
            if (match[2] === '~=') {
              match[3] = ' ' + match[3] + ' '
            }
            return match.slice(0, 4)
          },
          CHILD: function (match) {
            match[1] = match[1].toLowerCase()
            if (match[1].slice(0, 3) === 'nth') {
              if (!match[3]) {
                Sizzle.error(match[0])
              }
              match[4] = +(match[4]
                ? match[5] + (match[6] || 1)
                : 2 * (match[3] === 'even' || match[3] === 'odd'))
              match[5] = +(match[7] + match[8] || match[3] === 'odd')
            } else {
              if (match[3]) {
                Sizzle.error(match[0])
              }
            }
            return match
          },
          PSEUDO: function (match) {
            var excess,
              unquoted = !match[6] && match[2]
            if (matchExpr.CHILD.test(match[0])) {
              return null
            }
            if (match[3]) {
              match[2] = match[4] || match[5] || ''
            } else {
              if (
                unquoted &&
                rpseudo.test(unquoted) &&
                (excess = tokenize(unquoted, true)) &&
                (excess =
                  unquoted.indexOf(')', unquoted.length - excess) -
                  unquoted.length)
              ) {
                match[0] = match[0].slice(0, excess)
                match[2] = unquoted.slice(0, excess)
              }
            }
            return match.slice(0, 3)
          }
        },
        filter: {
          TAG: function (nodeNameSelector) {
            var nodeName = nodeNameSelector
              .replace(runescape, funescape)
              .toLowerCase()
            return nodeNameSelector === '*'
              ? function () {
                  return true
                }
              : function (elem) {
                  return (
                    elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                  )
                }
          },
          CLASS: function (className) {
            var pattern = classCache[className + ' ']
            return (
              pattern ||
              ((pattern = new RegExp(
                '(^|' + whitespace + ')' + className + '(' + whitespace + '|$)'
              )) &&
                classCache(className, function (elem) {
                  return pattern.test(
                    (typeof elem.className === 'string' && elem.className) ||
                      (typeof elem.getAttribute !== 'undefined' &&
                        elem.getAttribute('class')) ||
                      ''
                  )
                }))
            )
          },
          ATTR: function (name, operator, check) {
            return function (elem) {
              var result = Sizzle.attr(elem, name)
              if (result == null) {
                return operator === '!='
              }
              if (!operator) {
                return true
              }
              result += ''
              return operator === '='
                ? result === check
                : operator === '!='
                ? result !== check
                : operator === '^='
                ? check && result.indexOf(check) === 0
                : operator === '*='
                ? check && result.indexOf(check) > -1
                : operator === '$='
                ? check && result.slice(-check.length) === check
                : operator === '~='
                ? (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(
                    check
                  ) > -1
                : operator === '|='
                ? result === check ||
                  result.slice(0, check.length + 1) === check + '-'
                : false
            }
          },
          CHILD: function (type, what, argument, first, last) {
            var simple = type.slice(0, 3) !== 'nth',
              forward = type.slice(-4) !== 'last',
              ofType = what === 'of-type'
            return first === 1 && last === 0
              ? function (elem) {
                  return !!elem.parentNode
                }
              : function (elem, context, xml) {
                  var cache,
                    outerCache,
                    node,
                    diff,
                    nodeIndex,
                    start,
                    dir =
                      simple !== forward ? 'nextSibling' : 'previousSibling',
                    parent = elem.parentNode,
                    name = ofType && elem.nodeName.toLowerCase(),
                    useCache = !xml && !ofType
                  if (parent) {
                    if (simple) {
                      while (dir) {
                        node = elem
                        while ((node = node[dir])) {
                          if (
                            ofType
                              ? node.nodeName.toLowerCase() === name
                              : node.nodeType === 1
                          ) {
                            return false
                          }
                        }
                        start = dir = type === 'only' && !start && 'nextSibling'
                      }
                      return true
                    }
                    start = [forward ? parent.firstChild : parent.lastChild]
                    if (forward && useCache) {
                      outerCache = parent[expando] || (parent[expando] = {})
                      cache = outerCache[type] || []
                      nodeIndex = cache[0] === dirruns && cache[1]
                      diff = cache[0] === dirruns && cache[2]
                      node = nodeIndex && parent.childNodes[nodeIndex]
                      while (
                        (node =
                          (++nodeIndex && node && node[dir]) ||
                          (diff = nodeIndex = 0) ||
                          start.pop())
                      ) {
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          outerCache[type] = [dirruns, nodeIndex, diff]
                          break
                        }
                      }
                    } else {
                      if (
                        useCache &&
                        (cache = (elem[expando] || (elem[expando] = {}))[
                          type
                        ]) &&
                        cache[0] === dirruns
                      ) {
                        diff = cache[1]
                      } else {
                        while (
                          (node =
                            (++nodeIndex && node && node[dir]) ||
                            (diff = nodeIndex = 0) ||
                            start.pop())
                        ) {
                          if (
                            (ofType
                              ? node.nodeName.toLowerCase() === name
                              : node.nodeType === 1) &&
                            ++diff
                          ) {
                            if (useCache) {
                              ;(node[expando] || (node[expando] = {}))[type] = [
                                dirruns,
                                diff
                              ]
                            }
                            if (node === elem) {
                              break
                            }
                          }
                        }
                      }
                    }
                    diff -= last
                    return (
                      diff === first ||
                      (diff % first === 0 && diff / first >= 0)
                    )
                  }
                }
          },
          PSEUDO: function (pseudo, argument) {
            var args,
              fn =
                Expr.pseudos[pseudo] ||
                Expr.setFilters[pseudo.toLowerCase()] ||
                Sizzle.error('unsupported pseudo: ' + pseudo)
            if (fn[expando]) {
              return fn(argument)
            }
            if (fn.length > 1) {
              args = [pseudo, pseudo, '', argument]
              return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
                ? markFunction(function (seed, matches) {
                    var idx,
                      matched = fn(seed, argument),
                      i = matched.length
                    while (i--) {
                      idx = indexOf(seed, matched[i])
                      seed[idx] = !(matches[idx] = matched[i])
                    }
                  })
                : function (elem) {
                    return fn(elem, 0, args)
                  }
            }
            return fn
          }
        },
        pseudos: {
          not: markFunction(function (selector) {
            var input = [],
              results = [],
              matcher = compile(selector.replace(rtrim, '$1'))
            return matcher[expando]
              ? markFunction(function (seed, matches, context, xml) {
                  var elem,
                    unmatched = matcher(seed, null, xml, []),
                    i = seed.length
                  while (i--) {
                    if ((elem = unmatched[i])) {
                      seed[i] = !(matches[i] = elem)
                    }
                  }
                })
              : function (elem, context, xml) {
                  input[0] = elem
                  matcher(input, null, xml, results)
                  input[0] = null
                  return !results.pop()
                }
          }),
          has: markFunction(function (selector) {
            return function (elem) {
              return Sizzle(selector, elem).length > 0
            }
          }),
          contains: markFunction(function (text) {
            text = text.replace(runescape, funescape)
            return function (elem) {
              return (
                (elem.textContent || elem.innerText || getText(elem)).indexOf(
                  text
                ) > -1
              )
            }
          }),
          lang: markFunction(function (lang) {
            if (!ridentifier.test(lang || '')) {
              Sizzle.error('unsupported lang: ' + lang)
            }
            lang = lang.replace(runescape, funescape).toLowerCase()
            return function (elem) {
              var elemLang
              do {
                if (
                  (elemLang = documentIsHTML
                    ? elem.lang
                    : elem.getAttribute('xml:lang') ||
                      elem.getAttribute('lang'))
                ) {
                  elemLang = elemLang.toLowerCase()
                  return elemLang === lang || elemLang.indexOf(lang + '-') === 0
                }
              } while ((elem = elem.parentNode) && elem.nodeType === 1)
              return false
            }
          }),
          target: function (elem) {
            var hash = window.location && window.location.hash
            return hash && hash.slice(1) === elem.id
          },
          root: function (elem) {
            return elem === docElem
          },
          focus: function (elem) {
            return (
              elem === document.activeElement &&
              (!document.hasFocus || document.hasFocus()) &&
              !!(elem.type || elem.href || ~elem.tabIndex)
            )
          },
          enabled: function (elem) {
            return elem.disabled === false
          },
          disabled: function (elem) {
            return elem.disabled === true
          },
          checked: function (elem) {
            var nodeName = elem.nodeName.toLowerCase()
            return (
              (nodeName === 'input' && !!elem.checked) ||
              (nodeName === 'option' && !!elem.selected)
            )
          },
          selected: function (elem) {
            if (elem.parentNode) {
              elem.parentNode.selectedIndex
            }
            return elem.selected === true
          },
          empty: function (elem) {
            for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
              if (elem.nodeType < 6) {
                return false
              }
            }
            return true
          },
          parent: function (elem) {
            return !Expr.pseudos.empty(elem)
          },
          header: function (elem) {
            return rheader.test(elem.nodeName)
          },
          input: function (elem) {
            return rinputs.test(elem.nodeName)
          },
          button: function (elem) {
            var name = elem.nodeName.toLowerCase()
            return (
              (name === 'input' && elem.type === 'button') || name === 'button'
            )
          },
          text: function (elem) {
            var attr
            return (
              elem.nodeName.toLowerCase() === 'input' &&
              elem.type === 'text' &&
              ((attr = elem.getAttribute('type')) == null ||
                attr.toLowerCase() === 'text')
            )
          },
          first: createPositionalPseudo(function () {
            return [0]
          }),
          last: createPositionalPseudo(function (matchIndexes, length) {
            return [length - 1]
          }),
          eq: createPositionalPseudo(function (matchIndexes, length, argument) {
            return [argument < 0 ? argument + length : argument]
          }),
          even: createPositionalPseudo(function (matchIndexes, length) {
            var i = 0
            for (; i < length; i += 2) {
              matchIndexes.push(i)
            }
            return matchIndexes
          }),
          odd: createPositionalPseudo(function (matchIndexes, length) {
            var i = 1
            for (; i < length; i += 2) {
              matchIndexes.push(i)
            }
            return matchIndexes
          }),
          lt: createPositionalPseudo(function (matchIndexes, length, argument) {
            var i = argument < 0 ? argument + length : argument
            for (; --i >= 0; ) {
              matchIndexes.push(i)
            }
            return matchIndexes
          }),
          gt: createPositionalPseudo(function (matchIndexes, length, argument) {
            var i = argument < 0 ? argument + length : argument
            for (; ++i < length; ) {
              matchIndexes.push(i)
            }
            return matchIndexes
          })
        }
      }
      Expr.pseudos.nth = Expr.pseudos.eq
      for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }) {
        Expr.pseudos[i] = createInputPseudo(i)
      }
      for (i in {
        submit: true,
        reset: true
      }) {
        Expr.pseudos[i] = createButtonPseudo(i)
      }

      function setFilters () {}
      setFilters.prototype = Expr.filters = Expr.pseudos
      Expr.setFilters = new setFilters()
      tokenize = Sizzle.tokenize = function (selector, parseOnly) {
        var matched,
          match,
          tokens,
          type,
          soFar,
          groups,
          preFilters,
          cached = tokenCache[selector + ' ']
        if (cached) {
          return parseOnly ? 0 : cached.slice(0)
        }
        soFar = selector
        groups = []
        preFilters = Expr.preFilter
        while (soFar) {
          if (!matched || (match = rcomma.exec(soFar))) {
            if (match) {
              soFar = soFar.slice(match[0].length) || soFar
            }
            groups.push((tokens = []))
          }
          matched = false
          if ((match = rcombinators.exec(soFar))) {
            matched = match.shift()
            tokens.push({
              value: matched,
              type: match[0].replace(rtrim, ' ')
            })
            soFar = soFar.slice(matched.length)
          }
          for (type in Expr.filter) {
            if (
              (match = matchExpr[type].exec(soFar)) &&
              (!preFilters[type] || (match = preFilters[type](match)))
            ) {
              matched = match.shift()
              tokens.push({
                value: matched,
                type: type,
                matches: match
              })
              soFar = soFar.slice(matched.length)
            }
          }
          if (!matched) {
            break
          }
        }
        return parseOnly
          ? soFar.length
          : soFar
          ? Sizzle.error(selector)
          : tokenCache(selector, groups).slice(0)
      }

      function toSelector (tokens) {
        var i = 0,
          len = tokens.length,
          selector = ''
        for (; i < len; i++) {
          selector += tokens[i].value
        }
        return selector
      }

      function addCombinator (matcher, combinator, base) {
        var dir = combinator.dir,
          checkNonElements = base && dir === 'parentNode',
          doneName = done++
        return combinator.first
          ? function (elem, context, xml) {
              while ((elem = elem[dir])) {
                if (elem.nodeType === 1 || checkNonElements) {
                  return matcher(elem, context, xml)
                }
              }
            }
          : function (elem, context, xml) {
              var oldCache,
                outerCache,
                newCache = [dirruns, doneName]
              if (xml) {
                while ((elem = elem[dir])) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    if (matcher(elem, context, xml)) {
                      return true
                    }
                  }
                }
              } else {
                while ((elem = elem[dir])) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    outerCache = elem[expando] || (elem[expando] = {})
                    if (
                      (oldCache = outerCache[dir]) &&
                      oldCache[0] === dirruns &&
                      oldCache[1] === doneName
                    ) {
                      return (newCache[2] = oldCache[2])
                    } else {
                      outerCache[dir] = newCache
                      if ((newCache[2] = matcher(elem, context, xml))) {
                        return true
                      }
                    }
                  }
                }
              }
            }
      }

      function elementMatcher (matchers) {
        return matchers.length > 1
          ? function (elem, context, xml) {
              var i = matchers.length
              while (i--) {
                if (!matchers[i](elem, context, xml)) {
                  return false
                }
              }
              return true
            }
          : matchers[0]
      }

      function multipleContexts (selector, contexts, results) {
        var i = 0,
          len = contexts.length
        for (; i < len; i++) {
          Sizzle(selector, contexts[i], results)
        }
        return results
      }

      function condense (unmatched, map, filter, context, xml) {
        var elem,
          newUnmatched = [],
          i = 0,
          len = unmatched.length,
          mapped = map != null
        for (; i < len; i++) {
          if ((elem = unmatched[i])) {
            if (!filter || filter(elem, context, xml)) {
              newUnmatched.push(elem)
              if (mapped) {
                map.push(i)
              }
            }
          }
        }
        return newUnmatched
      }

      function setMatcher (
        preFilter,
        selector,
        matcher,
        postFilter,
        postFinder,
        postSelector
      ) {
        if (postFilter && !postFilter[expando]) {
          postFilter = setMatcher(postFilter)
        }
        if (postFinder && !postFinder[expando]) {
          postFinder = setMatcher(postFinder, postSelector)
        }
        return markFunction(function (seed, results, context, xml) {
          var temp,
            i,
            elem,
            preMap = [],
            postMap = [],
            preexisting = results.length,
            elems =
              seed ||
              multipleContexts(
                selector || '*',
                context.nodeType ? [context] : context,
                []
              ),
            matcherIn =
              preFilter && (seed || !selector)
                ? condense(elems, preMap, preFilter, context, xml)
                : elems,
            matcherOut = matcher
              ? postFinder || (seed ? preFilter : preexisting || postFilter)
                ? []
                : results
              : matcherIn
          if (matcher) {
            matcher(matcherIn, matcherOut, context, xml)
          }
          if (postFilter) {
            temp = condense(matcherOut, postMap)
            postFilter(temp, [], context, xml)
            i = temp.length
            while (i--) {
              if ((elem = temp[i])) {
                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
              }
            }
          }
          if (seed) {
            if (postFinder || preFilter) {
              if (postFinder) {
                temp = []
                i = matcherOut.length
                while (i--) {
                  if ((elem = matcherOut[i])) {
                    temp.push((matcherIn[i] = elem))
                  }
                }
                postFinder(null, (matcherOut = []), temp, xml)
              }
              i = matcherOut.length
              while (i--) {
                if (
                  (elem = matcherOut[i]) &&
                  (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1
                ) {
                  seed[temp] = !(results[temp] = elem)
                }
              }
            }
          } else {
            matcherOut = condense(
              matcherOut === results
                ? matcherOut.splice(preexisting, matcherOut.length)
                : matcherOut
            )
            if (postFinder) {
              postFinder(null, results, matcherOut, xml)
            } else {
              push.apply(results, matcherOut)
            }
          }
        })
      }

      function matcherFromTokens (tokens) {
        var checkContext,
          matcher,
          j,
          len = tokens.length,
          leadingRelative = Expr.relative[tokens[0].type],
          implicitRelative = leadingRelative || Expr.relative[' '],
          i = leadingRelative ? 1 : 0,
          matchContext = addCombinator(
            function (elem) {
              return elem === checkContext
            },
            implicitRelative,
            true
          ),
          matchAnyContext = addCombinator(
            function (elem) {
              return indexOf(checkContext, elem) > -1
            },
            implicitRelative,
            true
          ),
          matchers = [
            function (elem, context, xml) {
              var ret =
                (!leadingRelative && (xml || context !== outermostContext)) ||
                ((checkContext = context).nodeType
                  ? matchContext(elem, context, xml)
                  : matchAnyContext(elem, context, xml))
              checkContext = null
              return ret
            }
          ]
        for (; i < len; i++) {
          if ((matcher = Expr.relative[tokens[i].type])) {
            matchers = [addCombinator(elementMatcher(matchers), matcher)]
          } else {
            matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches)
            if (matcher[expando]) {
              j = ++i
              for (; j < len; j++) {
                if (Expr.relative[tokens[j].type]) {
                  break
                }
              }
              return setMatcher(
                i > 1 && elementMatcher(matchers),
                i > 1 &&
                  toSelector(
                    tokens.slice(0, i - 1).concat({
                      value: tokens[i - 2].type === ' ' ? '*' : ''
                    })
                  ).replace(rtrim, '$1'),
                matcher,
                i < j && matcherFromTokens(tokens.slice(i, j)),
                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                j < len && toSelector(tokens)
              )
            }
            matchers.push(matcher)
          }
        }
        return elementMatcher(matchers)
      }

      function matcherFromGroupMatchers (elementMatchers, setMatchers) {
        var bySet = setMatchers.length > 0,
          byElement = elementMatchers.length > 0,
          superMatcher = function (seed, context, xml, results, outermost) {
            var elem,
              j,
              matcher,
              matchedCount = 0,
              i = '0',
              unmatched = seed && [],
              setMatched = [],
              contextBackup = outermostContext,
              elems = seed || (byElement && Expr.find.TAG('*', outermost)),
              dirrunsUnique = (dirruns +=
                contextBackup == null ? 1 : Math.random() || 0.1),
              len = elems.length
            if (outermost) {
              outermostContext = context !== document && context
            }
            for (; i !== len && (elem = elems[i]) != null; i++) {
              if (byElement && elem) {
                j = 0
                while ((matcher = elementMatchers[j++])) {
                  if (matcher(elem, context, xml)) {
                    results.push(elem)
                    break
                  }
                }
                if (outermost) {
                  dirruns = dirrunsUnique
                }
              }
              if (bySet) {
                if ((elem = !matcher && elem)) {
                  matchedCount--
                }
                if (seed) {
                  unmatched.push(elem)
                }
              }
            }
            matchedCount += i
            if (bySet && i !== matchedCount) {
              j = 0
              while ((matcher = setMatchers[j++])) {
                matcher(unmatched, setMatched, context, xml)
              }
              if (seed) {
                if (matchedCount > 0) {
                  while (i--) {
                    if (!(unmatched[i] || setMatched[i])) {
                      setMatched[i] = pop.call(results)
                    }
                  }
                }
                setMatched = condense(setMatched)
              }
              push.apply(results, setMatched)
              if (
                outermost &&
                !seed &&
                setMatched.length > 0 &&
                matchedCount + setMatchers.length > 1
              ) {
                Sizzle.uniqueSort(results)
              }
            }
            if (outermost) {
              dirruns = dirrunsUnique
              outermostContext = contextBackup
            }
            return unmatched
          }
        return bySet ? markFunction(superMatcher) : superMatcher
      }
      compile = Sizzle.compile = function (selector, match) {
        var i,
          setMatchers = [],
          elementMatchers = [],
          cached = compilerCache[selector + ' ']
        if (!cached) {
          if (!match) {
            match = tokenize(selector)
          }
          i = match.length
          while (i--) {
            cached = matcherFromTokens(match[i])
            if (cached[expando]) {
              setMatchers.push(cached)
            } else {
              elementMatchers.push(cached)
            }
          }
          cached = compilerCache(
            selector,
            matcherFromGroupMatchers(elementMatchers, setMatchers)
          )
          cached.selector = selector
        }
        return cached
      }
      select = Sizzle.select = function (selector, context, results, seed) {
        var i,
          tokens,
          token,
          type,
          find,
          compiled = typeof selector === 'function' && selector,
          match = !seed && tokenize((selector = compiled.selector || selector))
        results = results || []
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0)
          if (
            tokens.length > 2 &&
            (token = tokens[0]).type === 'ID' &&
            support.getById &&
            context.nodeType === 9 &&
            documentIsHTML &&
            Expr.relative[tokens[1].type]
          ) {
            context = (Expr.find.ID(
              token.matches[0].replace(runescape, funescape),
              context
            ) || [])[0]
            if (!context) {
              return results
            } else {
              if (compiled) {
                context = context.parentNode
              }
            }
            selector = selector.slice(tokens.shift().value.length)
          }
          i = matchExpr.needsContext.test(selector) ? 0 : tokens.length
          while (i--) {
            token = tokens[i]
            if (Expr.relative[(type = token.type)]) {
              break
            }
            if ((find = Expr.find[type])) {
              if (
                (seed = find(
                  token.matches[0].replace(runescape, funescape),
                  (rsibling.test(tokens[0].type) &&
                    testContext(context.parentNode)) ||
                    context
                ))
              ) {
                tokens.splice(i, 1)
                selector = seed.length && toSelector(tokens)
                if (!selector) {
                  push.apply(results, seed)
                  return results
                }
                break
              }
            }
          }
        }
        ;(compiled || compile(selector, match))(
          seed,
          context,
          !documentIsHTML,
          results,
          (rsibling.test(selector) && testContext(context.parentNode)) ||
            context
        )
        return results
      }
      support.sortStable =
        expando
          .split('')
          .sort(sortOrder)
          .join('') === expando
      support.detectDuplicates = !!hasDuplicate
      setDocument()
      support.sortDetached = assert(function (div1) {
        return div1.compareDocumentPosition(document.createElement('div')) & 1
      })
      if (
        !assert(function (div) {
          div.innerHTML = "<a href='#'></a>"
          return div.firstChild.getAttribute('href') === '#'
        })
      ) {
        addHandle('type|href|height|width', function (elem, name, isXML) {
          if (!isXML) {
            return elem.getAttribute(
              name,
              name.toLowerCase() === 'type' ? 1 : 2
            )
          }
        })
      }
      if (
        !support.attributes ||
        !assert(function (div) {
          div.innerHTML = '<input/>'
          div.firstChild.setAttribute('value', '')
          return div.firstChild.getAttribute('value') === ''
        })
      ) {
        addHandle('value', function (elem, name, isXML) {
          if (!isXML && elem.nodeName.toLowerCase() === 'input') {
            return elem.defaultValue
          }
        })
      }
      if (
        !assert(function (div) {
          return div.getAttribute('disabled') == null
        })
      ) {
        addHandle(booleans, function (elem, name, isXML) {
          var val
          if (!isXML) {
            return elem[name] === true
              ? name.toLowerCase()
              : (val = elem.getAttributeNode(name)) && val.specified
              ? val.value
              : null
          }
        })
      }
      return Sizzle
    })(window)
  jQuery.find = Sizzle
  jQuery.expr = Sizzle.selectors
  jQuery.expr[':'] = jQuery.expr.pseudos
  jQuery.unique = Sizzle.uniqueSort
  jQuery.text = Sizzle.getText
  jQuery.isXMLDoc = Sizzle.isXML
  jQuery.contains = Sizzle.contains
  var rneedsContext = jQuery.expr.match.needsContext
  var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
  var risSimple = /^.[^:#\[\.,]*$/

  function winnow (elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not
      })
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return (elem === qualifier) !== not
      })
    }
    if (typeof qualifier === 'string') {
      if (risSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not)
      }
      qualifier = jQuery.filter(qualifier, elements)
    }
    return jQuery.grep(elements, function (elem) {
      return indexOf.call(qualifier, elem) >= 0 !== not
    })
  }
  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0]
    if (not) {
      expr = ':not(' + expr + ')'
    }
    return elems.length === 1 && elem.nodeType === 1
      ? jQuery.find.matchesSelector(elem, expr)
        ? [elem]
        : []
      : jQuery.find.matches(
          expr,
          jQuery.grep(elems, function (elem) {
            return elem.nodeType === 1
          })
        )
  }
  jQuery.fn.extend({
    find: function (selector) {
      var i,
        len = this.length,
        ret = [],
        self = this
      if (typeof selector !== 'string') {
        return this.pushStack(
          jQuery(selector).filter(function () {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self[i], this)) {
                return true
              }
            }
          })
        )
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret)
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret)
      ret.selector = this.selector ? this.selector + ' ' + selector : selector
      return ret
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false))
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true))
    },
    is: function (selector) {
      return !!winnow(
        this,
        typeof selector === 'string' && rneedsContext.test(selector)
          ? jQuery(selector)
          : selector || [],
        false
      ).length
    }
  })
  var rootjQuery,
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    init = (jQuery.fn.init = function (selector, context) {
      var match, elem
      if (!selector) {
        return this
      }
      if (typeof selector === 'string') {
        if (
          selector[0] === '<' &&
          selector[selector.length - 1] === '>' &&
          selector.length >= 3
        ) {
          match = [null, selector, null]
        } else {
          match = rquickExpr.exec(selector)
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context
            jQuery.merge(
              this,
              jQuery.parseHTML(
                match[1],
                context && context.nodeType
                  ? context.ownerDocument || context
                  : document,
                true
              )
            )
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match])
                } else {
                  this.attr(match, context[match])
                }
              }
            }
            return this
          } else {
            elem = document.getElementById(match[2])
            if (elem && elem.parentNode) {
              this.length = 1
              this[0] = elem
            }
            this.context = document
            this.selector = selector
            return this
          }
        } else {
          if (!context || context.jquery) {
            return (context || rootjQuery).find(selector)
          } else {
            return this.constructor(context).find(selector)
          }
        }
      } else {
        if (selector.nodeType) {
          this.context = this[0] = selector
          this.length = 1
          return this
        } else {
          if (jQuery.isFunction(selector)) {
            return typeof rootjQuery.ready !== 'undefined'
              ? rootjQuery.ready(selector)
              : selector(jQuery)
          }
        }
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector
        this.context = selector.context
      }
      return jQuery.makeArray(selector, this)
    })
  init.prototype = jQuery.fn
  rootjQuery = jQuery(document)
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    }
  jQuery.extend({
    dir: function (elem, dir, until) {
      var matched = [],
        truncate = until !== undefined
      while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break
          }
          matched.push(elem)
        }
      }
      return matched
    },
    sibling: function (n, elem) {
      var matched = []
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n)
        }
      }
      return matched
    }
  })
  jQuery.fn.extend({
    has: function (target) {
      var targets = jQuery(target, this),
        l = targets.length
      return this.filter(function () {
        var i = 0
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true
          }
        }
      })
    },
    closest: function (selectors, context) {
      var cur,
        i = 0,
        l = this.length,
        matched = [],
        pos =
          rneedsContext.test(selectors) || typeof selectors !== 'string'
            ? jQuery(selectors, context || this.context)
            : 0
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (
            cur.nodeType < 11 &&
            (pos
              ? pos.index(cur) > -1
              : cur.nodeType === 1 &&
                jQuery.find.matchesSelector(cur, selectors))
          ) {
            matched.push(cur)
            break
          }
        }
      }
      return this.pushStack(
        matched.length > 1 ? jQuery.unique(matched) : matched
      )
    },
    index: function (elem) {
      if (!elem) {
        return this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1
      }
      if (typeof elem === 'string') {
        return indexOf.call(jQuery(elem), this[0])
      }
      return indexOf.call(this, elem.jquery ? elem[0] : elem)
    },
    add: function (selector, context) {
      return this.pushStack(
        jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context)))
      )
    },
    addBack: function (selector) {
      return this.add(
        selector == null ? this.prevObject : this.prevObject.filter(selector)
      )
    }
  })

  function sibling (cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur
  }
  jQuery.each(
    {
      parent: function (elem) {
        var parent = elem.parentNode
        return parent && parent.nodeType !== 11 ? parent : null
      },
      parents: function (elem) {
        return jQuery.dir(elem, 'parentNode')
      },
      parentsUntil: function (elem, i, until) {
        return jQuery.dir(elem, 'parentNode', until)
      },
      next: function (elem) {
        return sibling(elem, 'nextSibling')
      },
      prev: function (elem) {
        return sibling(elem, 'previousSibling')
      },
      nextAll: function (elem) {
        return jQuery.dir(elem, 'nextSibling')
      },
      prevAll: function (elem) {
        return jQuery.dir(elem, 'previousSibling')
      },
      nextUntil: function (elem, i, until) {
        return jQuery.dir(elem, 'nextSibling', until)
      },
      prevUntil: function (elem, i, until) {
        return jQuery.dir(elem, 'previousSibling', until)
      },
      siblings: function (elem) {
        return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
      },
      children: function (elem) {
        return jQuery.sibling(elem.firstChild)
      },
      contents: function (elem) {
        return elem.contentDocument || jQuery.merge([], elem.childNodes)
      }
    },
    function (name, fn) {
      jQuery.fn[name] = function (until, selector) {
        var matched = jQuery.map(this, fn, until)
        if (name.slice(-5) !== 'Until') {
          selector = until
        }
        if (selector && typeof selector === 'string') {
          matched = jQuery.filter(selector, matched)
        }
        if (this.length > 1) {
          if (!guaranteedUnique[name]) {
            jQuery.unique(matched)
          }
          if (rparentsprev.test(name)) {
            matched.reverse()
          }
        }
        return this.pushStack(matched)
      }
    }
  )
  var rnotwhite = /\S+/g
  var optionsCache = {}

  function createOptions (options) {
    var object = (optionsCache[options] = {})
    jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
      object[flag] = true
    })
    return object
  }
  jQuery.Callbacks = function (options) {
    options =
      typeof options === 'string'
        ? optionsCache[options] || createOptions(options)
        : jQuery.extend({}, options)
    var memory,
      fired,
      firing,
      firingStart,
      firingLength,
      firingIndex,
      list = [],
      stack = !options.once && [],
      fire = function (data) {
        memory = options.memory && data
        fired = true
        firingIndex = firingStart || 0
        firingStart = 0
        firingLength = list.length
        firing = true
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (
            list[firingIndex].apply(data[0], data[1]) === false &&
            options.stopOnFalse
          ) {
            memory = false
            break
          }
        }
        firing = false
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift())
            }
          } else {
            if (memory) {
              list = []
            } else {
              self.disable()
            }
          }
        }
      },
      self = {
        add: function () {
          if (list) {
            var start = list.length
            ;(function add (args) {
              jQuery.each(args, function (_, arg) {
                var type = jQuery.type(arg)
                if (type === 'function') {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg)
                  }
                } else {
                  if (arg && arg.length && type !== 'string') {
                    add(arg)
                  }
                }
              })
            })(arguments)
            if (firing) {
              firingLength = list.length
            } else {
              if (memory) {
                firingStart = start
                fire(memory)
              }
            }
          }
          return this
        },
        remove: function () {
          if (list) {
            jQuery.each(arguments, function (_, arg) {
              var index
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1)
                if (firing) {
                  if (index <= firingLength) {
                    firingLength--
                  }
                  if (index <= firingIndex) {
                    firingIndex--
                  }
                }
              }
            })
          }
          return this
        },
        has: function (fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length)
        },
        empty: function () {
          list = []
          firingLength = 0
          return this
        },
        disable: function () {
          list = stack = memory = undefined
          return this
        },
        disabled: function () {
          return !list
        },
        lock: function () {
          stack = undefined
          if (!memory) {
            self.disable()
          }
          return this
        },
        locked: function () {
          return !stack
        },
        fireWith: function (context, args) {
          if (list && (!fired || stack)) {
            args = args || []
            args = [context, args.slice ? args.slice() : args]
            if (firing) {
              stack.push(args)
            } else {
              fire(args)
            }
          }
          return this
        },
        fire: function () {
          self.fireWith(this, arguments)
          return this
        },
        fired: function () {
          return !!fired
        }
      }
    return self
  }
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
          ['resolve', 'done', jQuery.Callbacks('once memory'), 'resolved'],
          ['reject', 'fail', jQuery.Callbacks('once memory'), 'rejected'],
          ['notify', 'progress', jQuery.Callbacks('memory')]
        ],
        state = 'pending',
        promise = {
          state: function () {
            return state
          },
          always: function () {
            deferred.done(arguments).fail(arguments)
            return this
          },
          then: function () {
            var fns = arguments
            return jQuery
              .Deferred(function (newDefer) {
                jQuery.each(tuples, function (i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i]
                  deferred[tuple[1]](function () {
                    var returned = fn && fn.apply(this, arguments)
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned
                        .promise()
                        .done(newDefer.resolve)
                        .fail(newDefer.reject)
                        .progress(newDefer.notify)
                    } else {
                      newDefer[tuple[0] + 'With'](
                        this === promise ? newDefer.promise() : this,
                        fn ? [returned] : arguments
                      )
                    }
                  })
                })
                fns = null
              })
              .promise()
          },
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise
          }
        },
        deferred = {}
      promise.pipe = promise.then
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
          stateString = tuple[3]
        promise[tuple[1]] = list.add
        if (stateString) {
          list.add(
            function () {
              state = stateString
            },
            tuples[i ^ 1][2].disable,
            tuples[2][2].lock
          )
        }
        deferred[tuple[0]] = function () {
          deferred[tuple[0] + 'With'](
            this === deferred ? promise : this,
            arguments
          )
          return this
        }
        deferred[tuple[0] + 'With'] = list.fireWith
      })
      promise.promise(deferred)
      if (func) {
        func.call(deferred, deferred)
      }
      return deferred
    },
    when: function (subordinate) {
      var i = 0,
        resolveValues = slice.call(arguments),
        length = resolveValues.length,
        remaining =
          length !== 1 ||
          (subordinate && jQuery.isFunction(subordinate.promise))
            ? length
            : 0,
        deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
        updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this
            values[i] = arguments.length > 1 ? slice.call(arguments) : value
            if (values === progressValues) {
              deferred.notifyWith(contexts, values)
            } else {
              if (!--remaining) {
                deferred.resolveWith(contexts, values)
              }
            }
          }
        },
        progressValues,
        progressContexts,
        resolveContexts
      if (length > 1) {
        progressValues = new Array(length)
        progressContexts = new Array(length)
        resolveContexts = new Array(length)
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i]
              .promise()
              .done(updateFunc(i, resolveContexts, resolveValues))
              .fail(deferred.reject)
              .progress(updateFunc(i, progressContexts, progressValues))
          } else {
            --remaining
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues)
      }
      return deferred.promise()
    }
  })
  var readyList
  jQuery.fn.ready = function (fn) {
    jQuery.ready.promise().done(fn)
    return this
  }
  jQuery.extend({
    isReady: false,
    readyWait: 1,
    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++
      } else {
        jQuery.ready(true)
      }
    },
    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return
      }
      jQuery.isReady = true
      if (wait !== true && --jQuery.readyWait > 0) {
        return
      }
      readyList.resolveWith(document, [jQuery])
      if (jQuery.fn.triggerHandler) {
        jQuery(document).triggerHandler('ready')
        jQuery(document).off('ready')
      }
    }
  })

  function completed () {
    document.removeEventListener('DOMContentLoaded', completed, false)
    window.removeEventListener('load', completed, false)
    jQuery.ready()
  }
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred()
      if (document.readyState === 'complete') {
        setTimeout(jQuery.ready)
      } else {
        document.addEventListener('DOMContentLoaded', completed, false)
        window.addEventListener('load', completed, false)
      }
    }
    return readyList.promise(obj)
  }
  jQuery.ready.promise()
  var access = (jQuery.access = function (
    elems,
    fn,
    key,
    value,
    chainable,
    emptyGet,
    raw
  ) {
    var i = 0,
      len = elems.length,
      bulk = key == null
    if (jQuery.type(key) === 'object') {
      chainable = true
      for (i in key) {
        jQuery.access(elems, fn, i, key[i], true, emptyGet, raw)
      }
    } else {
      if (value !== undefined) {
        chainable = true
        if (!jQuery.isFunction(value)) {
          raw = true
        }
        if (bulk) {
          if (raw) {
            fn.call(elems, value)
            fn = null
          } else {
            bulk = fn
            fn = function (elem, key, value) {
              return bulk.call(jQuery(elem), value)
            }
          }
        }
        if (fn) {
          for (; i < len; i++) {
            fn(
              elems[i],
              key,
              raw ? value : value.call(elems[i], i, fn(elems[i], key))
            )
          }
        }
      }
    }
    return chainable
      ? elems
      : bulk
      ? fn.call(elems)
      : len
      ? fn(elems[0], key)
      : emptyGet
  })
  jQuery.acceptData = function (owner) {
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType
  }

  function Data () {
    Object.defineProperty((this.cache = {}), 0, {
      get: function () {
        return {}
      }
    })
    this.expando = jQuery.expando + Data.uid++
  }
  Data.uid = 1
  Data.accepts = jQuery.acceptData
  Data.prototype = {
    key: function (owner) {
      if (!Data.accepts(owner)) {
        return 0
      }
      var descriptor = {},
        unlock = owner[this.expando]
      if (!unlock) {
        unlock = Data.uid++
        try {
          descriptor[this.expando] = {
            value: unlock
          }
          Object.defineProperties(owner, descriptor)
        } catch (e) {
          descriptor[this.expando] = unlock
          jQuery.extend(owner, descriptor)
        }
      }
      if (!this.cache[unlock]) {
        this.cache[unlock] = {}
      }
      return unlock
    },
    set: function (owner, data, value) {
      var prop,
        unlock = this.key(owner),
        cache = this.cache[unlock]
      if (typeof data === 'string') {
        cache[data] = value
      } else {
        if (jQuery.isEmptyObject(cache)) {
          jQuery.extend(this.cache[unlock], data)
        } else {
          for (prop in data) {
            cache[prop] = data[prop]
          }
        }
      }
      return cache
    },
    get: function (owner, key) {
      var cache = this.cache[this.key(owner)]
      return key === undefined ? cache : cache[key]
    },
    access: function (owner, key, value) {
      var stored
      if (
        key === undefined ||
        (key && typeof key === 'string' && value === undefined)
      ) {
        stored = this.get(owner, key)
        return stored !== undefined
          ? stored
          : this.get(owner, jQuery.camelCase(key))
      }
      this.set(owner, key, value)
      return value !== undefined ? value : key
    },
    remove: function (owner, key) {
      var i,
        name,
        camel,
        unlock = this.key(owner),
        cache = this.cache[unlock]
      if (key === undefined) {
        this.cache[unlock] = {}
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase))
        } else {
          camel = jQuery.camelCase(key)
          if (key in cache) {
            name = [key, camel]
          } else {
            name = camel
            name = name in cache ? [name] : name.match(rnotwhite) || []
          }
        }
        i = name.length
        while (i--) {
          delete cache[name[i]]
        }
      }
    },
    hasData: function (owner) {
      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {})
    },
    discard: function (owner) {
      if (owner[this.expando]) {
        delete this.cache[owner[this.expando]]
      }
    }
  }
  var data_priv = new Data()
  var data_user = new Data()
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /([A-Z])/g

  function dataAttr (elem, key, data) {
    var name
    if (data === undefined && elem.nodeType === 1) {
      name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase()
      data = elem.getAttribute(name)
      if (typeof data === 'string') {
        try {
          data =
            data === 'true'
              ? true
              : data === 'false'
              ? false
              : data === 'null'
              ? null
              : +data + '' === data
              ? +data
              : rbrace.test(data)
              ? jQuery.parseJSON(data)
              : data
        } catch (e) {}
        data_user.set(elem, key, data)
      } else {
        data = undefined
      }
    }
    return data
  }
  jQuery.extend({
    hasData: function (elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem)
    },
    data: function (elem, name, data) {
      return data_user.access(elem, name, data)
    },
    removeData: function (elem, name) {
      data_user.remove(elem, name)
    },
    _data: function (elem, name, data) {
      return data_priv.access(elem, name, data)
    },
    _removeData: function (elem, name) {
      data_priv.remove(elem, name)
    }
  })
  jQuery.fn.extend({
    data: function (key, value) {
      var i,
        name,
        data,
        elem = this[0],
        attrs = elem && elem.attributes
      if (key === undefined) {
        if (this.length) {
          data = data_user.get(elem)
          if (elem.nodeType === 1 && !data_priv.get(elem, 'hasDataAttrs')) {
            i = attrs.length
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name
                if (name.indexOf('data-') === 0) {
                  name = jQuery.camelCase(name.slice(5))
                  dataAttr(elem, name, data[name])
                }
              }
            }
            data_priv.set(elem, 'hasDataAttrs', true)
          }
        }
        return data
      }
      if (typeof key === 'object') {
        return this.each(function () {
          data_user.set(this, key)
        })
      }
      return access(
        this,
        function (value) {
          var data,
            camelKey = jQuery.camelCase(key)
          if (elem && value === undefined) {
            data = data_user.get(elem, key)
            if (data !== undefined) {
              return data
            }
            data = data_user.get(elem, camelKey)
            if (data !== undefined) {
              return data
            }
            data = dataAttr(elem, camelKey, undefined)
            if (data !== undefined) {
              return data
            }
            return
          }
          this.each(function () {
            var data = data_user.get(this, camelKey)
            data_user.set(this, camelKey, value)
            if (key.indexOf('-') !== -1 && data !== undefined) {
              data_user.set(this, key, value)
            }
          })
        },
        null,
        value,
        arguments.length > 1,
        null,
        true
      )
    },
    removeData: function (key) {
      return this.each(function () {
        data_user.remove(this, key)
      })
    }
  })
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue
      if (elem) {
        type = (type || 'fx') + 'queue'
        queue = data_priv.get(elem, type)
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = data_priv.access(elem, type, jQuery.makeArray(data))
          } else {
            queue.push(data)
          }
        }
        return queue || []
      }
    },
    dequeue: function (elem, type) {
      type = type || 'fx'
      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function () {
          jQuery.dequeue(elem, type)
        }
      if (fn === 'inprogress') {
        fn = queue.shift()
        startLength--
      }
      if (fn) {
        if (type === 'fx') {
          queue.unshift('inprogress')
        }
        delete hooks.stop
        fn.call(elem, next, hooks)
      }
      if (!startLength && hooks) {
        hooks.empty.fire()
      }
    },
    _queueHooks: function (elem, type) {
      var key = type + 'queueHooks'
      return (
        data_priv.get(elem, key) ||
        data_priv.access(elem, key, {
          empty: jQuery.Callbacks('once memory').add(function () {
            data_priv.remove(elem, [type + 'queue', key])
          })
        })
      )
    }
  })
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2
      if (typeof type !== 'string') {
        data = type
        type = 'fx'
        setter--
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type)
      }
      return data === undefined
        ? this
        : this.each(function () {
            var queue = jQuery.queue(this, type, data)
            jQuery._queueHooks(this, type)
            if (type === 'fx' && queue[0] !== 'inprogress') {
              jQuery.dequeue(this, type)
            }
          })
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type)
      })
    },
    clearQueue: function (type) {
      return this.queue(type || 'fx', [])
    },
    promise: function (type, obj) {
      var tmp,
        count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function () {
          if (!--count) {
            defer.resolveWith(elements, [elements])
          }
        }
      if (typeof type !== 'string') {
        obj = type
        type = undefined
      }
      type = type || 'fx'
      while (i--) {
        tmp = data_priv.get(elements[i], type + 'queueHooks')
        if (tmp && tmp.empty) {
          count++
          tmp.empty.add(resolve)
        }
      }
      resolve()
      return defer.promise(obj)
    }
  })
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
  var cssExpand = ['Top', 'Right', 'Bottom', 'Left']
  var isHidden = function (elem, el) {
    elem = el || elem
    return (
      jQuery.css(elem, 'display') === 'none' ||
      !jQuery.contains(elem.ownerDocument, elem)
    )
  }
  var rcheckableType = /^(?:checkbox|radio)$/i
  ;(function () {
    var fragment = document.createDocumentFragment(),
      div = fragment.appendChild(document.createElement('div')),
      input = document.createElement('input')
    input.setAttribute('type', 'radio')
    input.setAttribute('checked', 'checked')
    input.setAttribute('name', 't')
    div.appendChild(input)
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked
    div.innerHTML = '<textarea>x</textarea>'
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue
  })()
  var strundefined = typeof undefined
  support.focusinBubbles = 'onfocusin' in window
  var rkeyEvent = /^key/,
    rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
    rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    rtypenamespace = /^([^.]*)(?:\.(.+)|)$/

  function returnTrue () {
    return true
  }

  function returnFalse () {
    return false
  }

  function safeActiveElement () {
    try {
      return document.activeElement
    } catch (err) {}
  }
  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var handleObjIn,
        eventHandle,
        tmp,
        events,
        t,
        handleObj,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = data_priv.get(elem)
      if (!elemData) {
        return
      }
      if (handler.handler) {
        handleObjIn = handler
        handler = handleObjIn.handler
        selector = handleObjIn.selector
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {}
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          return typeof jQuery !== strundefined &&
            jQuery.event.triggered !== e.type
            ? jQuery.event.dispatch.apply(elem, arguments)
            : undefined
        }
      }
      types = (types || '').match(rnotwhite) || ['']
      t = types.length
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || []
        type = origType = tmp[1]
        namespaces = (tmp[2] || '').split('.').sort()
        if (!type) {
          continue
        }
        special = jQuery.event.special[type] || {}
        type = (selector ? special.delegateType : special.bindType) || type
        special = jQuery.event.special[type] || {}
        handleObj = jQuery.extend(
          {
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext:
              selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join('.')
          },
          handleObjIn
        )
        if (!(handlers = events[type])) {
          handlers = events[type] = []
          handlers.delegateCount = 0
          if (
            !special.setup ||
            special.setup.call(elem, data, namespaces, eventHandle) === false
          ) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false)
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj)
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj)
        } else {
          handlers.push(handleObj)
        }
        jQuery.event.global[type] = true
      }
    },
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j,
        origCount,
        tmp,
        events,
        t,
        handleObj,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = data_priv.hasData(elem) && data_priv.get(elem)
      if (!elemData || !(events = elemData.events)) {
        return
      }
      types = (types || '').match(rnotwhite) || ['']
      t = types.length
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || []
        type = origType = tmp[1]
        namespaces = (tmp[2] || '').split('.').sort()
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true)
          }
          continue
        }
        special = jQuery.event.special[type] || {}
        type = (selector ? special.delegateType : special.bindType) || type
        handlers = events[type] || []
        tmp =
          tmp[2] &&
          new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)')
        origCount = j = handlers.length
        while (j--) {
          handleObj = handlers[j]
          if (
            (mappedTypes || origType === handleObj.origType) &&
            (!handler || handler.guid === handleObj.guid) &&
            (!tmp || tmp.test(handleObj.namespace)) &&
            (!selector ||
              selector === handleObj.selector ||
              (selector === '**' && handleObj.selector))
          ) {
            handlers.splice(j, 1)
            if (handleObj.selector) {
              handlers.delegateCount--
            }
            if (special.remove) {
              special.remove.call(elem, handleObj)
            }
          }
        }
        if (origCount && !handlers.length) {
          if (
            !special.teardown ||
            special.teardown.call(elem, namespaces, elemData.handle) === false
          ) {
            jQuery.removeEvent(elem, type, elemData.handle)
          }
          delete events[type]
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle
        data_priv.remove(elem, 'events')
      }
    },
    trigger: function (event, data, elem, onlyHandlers) {
      var i,
        cur,
        tmp,
        bubbleType,
        ontype,
        handle,
        special,
        eventPath = [elem || document],
        type = hasOwn.call(event, 'type') ? event.type : event,
        namespaces = hasOwn.call(event, 'namespace')
          ? event.namespace.split('.')
          : []
      cur = tmp = elem = elem || document
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return
      }
      if (type.indexOf('.') >= 0) {
        namespaces = type.split('.')
        type = namespaces.shift()
        namespaces.sort()
      }
      ontype = type.indexOf(':') < 0 && 'on' + type
      event = event[jQuery.expando]
        ? event
        : new jQuery.Event(type, typeof event === 'object' && event)
      event.isTrigger = onlyHandlers ? 2 : 3
      event.namespace = namespaces.join('.')
      event.namespace_re = event.namespace
        ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)')
        : null
      event.result = undefined
      if (!event.target) {
        event.target = elem
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event])
      special = jQuery.event.special[type] || {}
      if (
        !onlyHandlers &&
        special.trigger &&
        special.trigger.apply(elem, data) === false
      ) {
        return
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur)
          tmp = cur
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window)
        }
      }
      i = 0
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type
        handle =
          (data_priv.get(cur, 'events') || {})[event.type] &&
          data_priv.get(cur, 'handle')
        if (handle) {
          handle.apply(cur, data)
        }
        handle = ontype && cur[ontype]
        if (handle && handle.apply && jQuery.acceptData(cur)) {
          event.result = handle.apply(cur, data)
          if (event.result === false) {
            event.preventDefault()
          }
        }
      }
      event.type = type
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if (
          (!special._default ||
            special._default.apply(eventPath.pop(), data) === false) &&
          jQuery.acceptData(elem)
        ) {
          if (
            ontype &&
            jQuery.isFunction(elem[type]) &&
            !jQuery.isWindow(elem)
          ) {
            tmp = elem[ontype]
            if (tmp) {
              elem[ontype] = null
            }
            jQuery.event.triggered = type
            elem[type]()
            jQuery.event.triggered = undefined
            if (tmp) {
              elem[ontype] = tmp
            }
          }
        }
      }
      return event.result
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event)
      var i,
        j,
        ret,
        matched,
        handleObj,
        handlerQueue = [],
        args = slice.call(arguments),
        handlers = (data_priv.get(this, 'events') || {})[event.type] || [],
        special = jQuery.event.special[event.type] || {}
      args[0] = event
      event.delegateTarget = this
      if (
        special.preDispatch &&
        special.preDispatch.call(this, event) === false
      ) {
        return
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers)
      i = 0
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem
        j = 0
        while (
          (handleObj = matched.handlers[j++]) &&
          !event.isImmediatePropagationStopped()
        ) {
          if (
            !event.namespace_re ||
            event.namespace_re.test(handleObj.namespace)
          ) {
            event.handleObj = handleObj
            event.data = handleObj.data
            ret = (
              (jQuery.event.special[handleObj.origType] || {}).handle ||
              handleObj.handler
            ).apply(matched.elem, args)
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault()
                event.stopPropagation()
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event)
      }
      return event.result
    },
    handlers: function (event, handlers) {
      var i,
        matches,
        sel,
        handleObj,
        handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target
      if (
        delegateCount &&
        cur.nodeType &&
        (!event.button || event.type !== 'click')
      ) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.disabled !== true || event.type !== 'click') {
            matches = []
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i]
              sel = handleObj.selector + ' '
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext
                  ? jQuery(sel, this).index(cur) >= 0
                  : jQuery.find(sel, this, null, [cur]).length
              }
              if (matches[sel]) {
                matches.push(handleObj)
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              })
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        })
      }
      return handlerQueue
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(
      ' '
    ),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (event, original) {
        if (event.which == null) {
          event.which =
            original.charCode != null ? original.charCode : original.keyCode
        }
        return event
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(
        ' '
      ),
      filter: function (event, original) {
        var eventDoc,
          doc,
          body,
          button = original.button
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document
          doc = eventDoc.documentElement
          body = eventDoc.body
          event.pageX =
            original.clientX +
            ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
            ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
          event.pageY =
            original.clientY +
            ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
            ((doc && doc.clientTop) || (body && body.clientTop) || 0)
        }
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0
        }
        return event
      }
    },
    fix: function (event) {
      if (event[jQuery.expando]) {
        return event
      }
      var i,
        prop,
        copy,
        type = event.type,
        originalEvent = event,
        fixHook = this.fixHooks[type]
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type)
          ? this.mouseHooks
          : rkeyEvent.test(type)
          ? this.keyHooks
          : {}
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props
      event = new jQuery.Event(originalEvent)
      i = copy.length
      while (i--) {
        prop = copy[i]
        event[prop] = originalEvent[prop]
      }
      if (!event.target) {
        event.target = document
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event
    },
    special: {
      load: {
        noBubble: true
      },
      focus: {
        trigger: function () {
          if (this !== safeActiveElement() && this.focus) {
            this.focus()
            return false
          }
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          if (this === safeActiveElement() && this.blur) {
            this.blur()
            return false
          }
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function () {
          if (
            this.type === 'checkbox' &&
            this.click &&
            jQuery.nodeName(this, 'input')
          ) {
            this.click()
            return false
          }
        },
        _default: function (event) {
          return jQuery.nodeName(event.target, 'a')
        }
      },
      beforeunload: {
        postDispatch: function (event) {
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result
          }
        }
      }
    },
    simulate: function (type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true,
        originalEvent: {}
      })
      if (bubble) {
        jQuery.event.trigger(e, null, elem)
      } else {
        jQuery.event.dispatch.call(elem, e)
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault()
      }
    }
  }
  jQuery.removeEvent = function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false)
    }
  }
  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props)
    }
    if (src && src.type) {
      this.originalEvent = src
      this.type = src.type
      this.isDefaultPrevented =
        src.defaultPrevented ||
        (src.defaultPrevented === undefined && src.returnValue === false)
          ? returnTrue
          : returnFalse
    } else {
      this.type = src
    }
    if (props) {
      jQuery.extend(this, props)
    }
    this.timeStamp = (src && src.timeStamp) || jQuery.now()
    this[jQuery.expando] = true
  }
  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function () {
      var e = this.originalEvent
      this.isDefaultPrevented = returnTrue
      if (e && e.preventDefault) {
        e.preventDefault()
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent
      this.isPropagationStopped = returnTrue
      if (e && e.stopPropagation) {
        e.stopPropagation()
      }
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent
      this.isImmediatePropagationStopped = returnTrue
      if (e && e.stopImmediatePropagation) {
        e.stopImmediatePropagation()
      }
      this.stopPropagation()
    }
  }
  jQuery.each(
    {
      mouseenter: 'mouseover',
      mouseleave: 'mouseout',
      pointerenter: 'pointerover',
      pointerleave: 'pointerout'
    },
    function (orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function (event) {
          var ret,
            target = this,
            related = event.relatedTarget,
            handleObj = event.handleObj
          if (
            !related ||
            (related !== target && !jQuery.contains(target, related))
          ) {
            event.type = handleObj.origType
            ret = handleObj.handler.apply(this, arguments)
            event.type = fix
          }
          return ret
        }
      }
    }
  )
  if (!support.focusinBubbles) {
    jQuery.each(
      {
        focus: 'focusin',
        blur: 'focusout'
      },
      function (orig, fix) {
        var handler = function (event) {
          jQuery.event.simulate(
            fix,
            event.target,
            jQuery.event.fix(event),
            true
          )
        }
        jQuery.event.special[fix] = {
          setup: function () {
            var doc = this.ownerDocument || this,
              attaches = data_priv.access(doc, fix)
            if (!attaches) {
              doc.addEventListener(orig, handler, true)
            }
            data_priv.access(doc, fix, (attaches || 0) + 1)
          },
          teardown: function () {
            var doc = this.ownerDocument || this,
              attaches = data_priv.access(doc, fix) - 1
            if (!attaches) {
              doc.removeEventListener(orig, handler, true)
              data_priv.remove(doc, fix)
            } else {
              data_priv.access(doc, fix, attaches)
            }
          }
        }
      }
    )
  }
  jQuery.fn.extend({
    on: function (types, selector, data, fn, one) {
      var origFn, type
      if (typeof types === 'object') {
        if (typeof selector !== 'string') {
          data = data || selector
          selector = undefined
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one)
        }
        return this
      }
      if (data == null && fn == null) {
        fn = selector
        data = selector = undefined
      } else {
        if (fn == null) {
          if (typeof selector === 'string') {
            fn = data
            data = undefined
          } else {
            fn = data
            data = selector
            selector = undefined
          }
        }
      }
      if (fn === false) {
        fn = returnFalse
      } else {
        if (!fn) {
          return this
        }
      }
      if (one === 1) {
        origFn = fn
        fn = function (event) {
          jQuery().off(event)
          return origFn.apply(this, arguments)
        }
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
      }
      return this.each(function () {
        jQuery.event.add(this, types, fn, data, selector)
      })
    },
    one: function (types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1)
    },
    off: function (types, selector, fn) {
      var handleObj, type
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj
        jQuery(types.delegateTarget).off(
          handleObj.namespace
            ? handleObj.origType + '.' + handleObj.namespace
            : handleObj.origType,
          handleObj.selector,
          handleObj.handler
        )
        return this
      }
      if (typeof types === 'object') {
        for (type in types) {
          this.off(type, selector, types[type])
        }
        return this
      }
      if (selector === false || typeof selector === 'function') {
        fn = selector
        selector = undefined
      }
      if (fn === false) {
        fn = returnFalse
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector)
      })
    },
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this)
      })
    },
    triggerHandler: function (type, data) {
      var elem = this[0]
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true)
      }
    }
  })
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    rtagName = /<([\w:]+)/,
    rhtml = /<|&#?\w+;/,
    rnoInnerhtml = /<(?:script|style|link)/i,
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rscriptType = /^$|\/(?:java|ecma)script/i,
    rscriptTypeMasked = /^true\/(.*)/,
    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    wrapMap = {
      option: [1, "<select multiple='multiple'>", '</select>'],
      thead: [1, '<table>', '</table>'],
      col: [2, '<table><colgroup>', '</colgroup></table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      _default: [0, '', '']
    }
  wrapMap.optgroup = wrapMap.option
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption =
    wrapMap.thead
  wrapMap.th = wrapMap.td

  function manipulationTarget (elem, content) {
    return jQuery.nodeName(elem, 'table') &&
      jQuery.nodeName(
        content.nodeType !== 11 ? content : content.firstChild,
        'tr'
      )
      ? elem.getElementsByTagName('tbody')[0] ||
          elem.appendChild(elem.ownerDocument.createElement('tbody'))
      : elem
  }

  function disableScript (elem) {
    elem.type = (elem.getAttribute('type') !== null) + '/' + elem.type
    return elem
  }

  function restoreScript (elem) {
    var match = rscriptTypeMasked.exec(elem.type)
    if (match) {
      elem.type = match[1]
    } else {
      elem.removeAttribute('type')
    }
    return elem
  }

  function setGlobalEval (elems, refElements) {
    var i = 0,
      l = elems.length
    for (; i < l; i++) {
      data_priv.set(
        elems[i],
        'globalEval',
        !refElements || data_priv.get(refElements[i], 'globalEval')
      )
    }
  }

  function cloneCopyEvent (src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events
    if (dest.nodeType !== 1) {
      return
    }
    if (data_priv.hasData(src)) {
      pdataOld = data_priv.access(src)
      pdataCur = data_priv.set(dest, pdataOld)
      events = pdataOld.events
      if (events) {
        delete pdataCur.handle
        pdataCur.events = {}
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i])
          }
        }
      }
    }
    if (data_user.hasData(src)) {
      udataOld = data_user.access(src)
      udataCur = jQuery.extend({}, udataOld)
      data_user.set(dest, udataCur)
    }
  }

  function getAll (context, tag) {
    var ret = context.getElementsByTagName
      ? context.getElementsByTagName(tag || '*')
      : context.querySelectorAll
      ? context.querySelectorAll(tag || '*')
      : []
    return tag === undefined || (tag && jQuery.nodeName(context, tag))
      ? jQuery.merge([context], ret)
      : ret
  }

  function fixInput (src, dest) {
    var nodeName = dest.nodeName.toLowerCase()
    if (nodeName === 'input' && rcheckableType.test(src.type)) {
      dest.checked = src.checked
    } else {
      if (nodeName === 'input' || nodeName === 'textarea') {
        dest.defaultValue = src.defaultValue
      }
    }
  }
  jQuery.extend({
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var i,
        l,
        srcElements,
        destElements,
        clone = elem.cloneNode(true),
        inPage = jQuery.contains(elem.ownerDocument, elem)
      if (
        !support.noCloneChecked &&
        (elem.nodeType === 1 || elem.nodeType === 11) &&
        !jQuery.isXMLDoc(elem)
      ) {
        destElements = getAll(clone)
        srcElements = getAll(elem)
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i])
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem)
          destElements = destElements || getAll(clone)
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i])
          }
        } else {
          cloneCopyEvent(elem, clone)
        }
      }
      destElements = getAll(clone, 'script')
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, 'script'))
      }
      return clone
    },
    buildFragment: function (elems, context, scripts, selection) {
      var elem,
        tmp,
        tag,
        wrap,
        contains,
        j,
        fragment = context.createDocumentFragment(),
        nodes = [],
        i = 0,
        l = elems.length
      for (; i < l; i++) {
        elem = elems[i]
        if (elem || elem === 0) {
          if (jQuery.type(elem) === 'object') {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem)
          } else {
            if (!rhtml.test(elem)) {
              nodes.push(context.createTextNode(elem))
            } else {
              tmp = tmp || fragment.appendChild(context.createElement('div'))
              tag = (rtagName.exec(elem) || ['', ''])[1].toLowerCase()
              wrap = wrapMap[tag] || wrapMap._default
              tmp.innerHTML =
                wrap[1] + elem.replace(rxhtmlTag, '<$1></$2>') + wrap[2]
              j = wrap[0]
              while (j--) {
                tmp = tmp.lastChild
              }
              jQuery.merge(nodes, tmp.childNodes)
              tmp = fragment.firstChild
              tmp.textContent = ''
            }
          }
        }
      }
      fragment.textContent = ''
      i = 0
      while ((elem = nodes[i++])) {
        if (selection && jQuery.inArray(elem, selection) !== -1) {
          continue
        }
        contains = jQuery.contains(elem.ownerDocument, elem)
        tmp = getAll(fragment.appendChild(elem), 'script')
        if (contains) {
          setGlobalEval(tmp)
        }
        if (scripts) {
          j = 0
          while ((elem = tmp[j++])) {
            if (rscriptType.test(elem.type || '')) {
              scripts.push(elem)
            }
          }
        }
      }
      return fragment
    },
    cleanData: function (elems) {
      var data,
        elem,
        type,
        key,
        special = jQuery.event.special,
        i = 0
      for (; (elem = elems[i]) !== undefined; i++) {
        if (jQuery.acceptData(elem)) {
          key = elem[data_priv.expando]
          if (key && (data = data_priv.cache[key])) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type)
                } else {
                  jQuery.removeEvent(elem, type, data.handle)
                }
              }
            }
            if (data_priv.cache[key]) {
              delete data_priv.cache[key]
            }
          }
        }
        delete data_user.cache[elem[data_user.expando]]
      }
    }
  })
  jQuery.fn.extend({
    text: function (value) {
      return access(
        this,
        function (value) {
          return value === undefined
            ? jQuery.text(this)
            : this.empty().each(function () {
                if (
                  this.nodeType === 1 ||
                  this.nodeType === 11 ||
                  this.nodeType === 9
                ) {
                  this.textContent = value
                }
              })
        },
        null,
        value,
        arguments.length
      )
    },
    append: function () {
      return this.domManip(arguments, function (elem) {
        if (
          this.nodeType === 1 ||
          this.nodeType === 11 ||
          this.nodeType === 9
        ) {
          var target = manipulationTarget(this, elem)
          target.appendChild(elem)
        }
      })
    },
    prepend: function () {
      return this.domManip(arguments, function (elem) {
        if (
          this.nodeType === 1 ||
          this.nodeType === 11 ||
          this.nodeType === 9
        ) {
          var target = manipulationTarget(this, elem)
          target.insertBefore(elem, target.firstChild)
        }
      })
    },
    before: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this)
        }
      })
    },
    after: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling)
        }
      })
    },
    remove: function (selector, keepData) {
      var elem,
        elems = selector ? jQuery.filter(selector, this) : this,
        i = 0
      for (; (elem = elems[i]) != null; i++) {
        if (!keepData && elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem))
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, 'script'))
          }
          elem.parentNode.removeChild(elem)
        }
      }
      return this
    },
    empty: function () {
      var elem,
        i = 0
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false))
          elem.textContent = ''
        }
      }
      return this
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents
      deepDataAndEvents =
        deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
      })
    },
    html: function (value) {
      return access(
        this,
        function (value) {
          var elem = this[0] || {},
            i = 0,
            l = this.length
          if (value === undefined && elem.nodeType === 1) {
            return elem.innerHTML
          }
          if (
            typeof value === 'string' &&
            !rnoInnerhtml.test(value) &&
            !wrapMap[(rtagName.exec(value) || ['', ''])[1].toLowerCase()]
          ) {
            value = value.replace(rxhtmlTag, '<$1></$2>')
            try {
              for (; i < l; i++) {
                elem = this[i] || {}
                if (elem.nodeType === 1) {
                  jQuery.cleanData(getAll(elem, false))
                  elem.innerHTML = value
                }
              }
              elem = 0
            } catch (e) {}
          }
          if (elem) {
            this.empty().append(value)
          }
        },
        null,
        value,
        arguments.length
      )
    },
    replaceWith: function () {
      var arg = arguments[0]
      this.domManip(arguments, function (elem) {
        arg = this.parentNode
        jQuery.cleanData(getAll(this))
        if (arg) {
          arg.replaceChild(elem, this)
        }
      })
      return arg && (arg.length || arg.nodeType) ? this : this.remove()
    },
    detach: function (selector) {
      return this.remove(selector, true)
    },
    domManip: function (args, callback) {
      args = concat.apply([], args)
      var fragment,
        first,
        scripts,
        hasScripts,
        node,
        doc,
        i = 0,
        l = this.length,
        set = this,
        iNoClone = l - 1,
        value = args[0],
        isFunction = jQuery.isFunction(value)
      if (
        isFunction ||
        (l > 1 &&
          typeof value === 'string' &&
          !support.checkClone &&
          rchecked.test(value))
      ) {
        return this.each(function (index) {
          var self = set.eq(index)
          if (isFunction) {
            args[0] = value.call(this, index, self.html())
          }
          self.domManip(args, callback)
        })
      }
      if (l) {
        fragment = jQuery.buildFragment(
          args,
          this[0].ownerDocument,
          false,
          this
        )
        first = fragment.firstChild
        if (fragment.childNodes.length === 1) {
          fragment = first
        }
        if (first) {
          scripts = jQuery.map(getAll(fragment, 'script'), disableScript)
          hasScripts = scripts.length
          for (; i < l; i++) {
            node = fragment
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true)
              if (hasScripts) {
                jQuery.merge(scripts, getAll(node, 'script'))
              }
            }
            callback.call(this[i], node, i)
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument
            jQuery.map(scripts, restoreScript)
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i]
              if (
                rscriptType.test(node.type || '') &&
                !data_priv.access(node, 'globalEval') &&
                jQuery.contains(doc, node)
              ) {
                if (node.src) {
                  if (jQuery._evalUrl) {
                    jQuery._evalUrl(node.src)
                  }
                } else {
                  jQuery.globalEval(node.textContent.replace(rcleanScript, ''))
                }
              }
            }
          }
        }
      }
      return this
    }
  })
  jQuery.each(
    {
      appendTo: 'append',
      prependTo: 'prepend',
      insertBefore: 'before',
      insertAfter: 'after',
      replaceAll: 'replaceWith'
    },
    function (name, original) {
      jQuery.fn[name] = function (selector) {
        var elems,
          ret = [],
          insert = jQuery(selector),
          last = insert.length - 1,
          i = 0
        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true)
          jQuery(insert[i])[original](elems)
          push.apply(ret, elems.get())
        }
        return this.pushStack(ret)
      }
    }
  )
  var iframe,
    elemdisplay = {}

  function actualDisplay (name, doc) {
    var style,
      elem = jQuery(doc.createElement(name)).appendTo(doc.body),
      display =
        window.getDefaultComputedStyle &&
        (style = window.getDefaultComputedStyle(elem[0]))
          ? style.display
          : jQuery.css(elem[0], 'display')
    elem.detach()
    return display
  }

  function defaultDisplay (nodeName) {
    var doc = document,
      display = elemdisplay[nodeName]
    if (!display) {
      display = actualDisplay(nodeName, doc)
      if (display === 'none' || !display) {
        iframe = (
          iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")
        ).appendTo(doc.documentElement)
        doc = iframe[0].contentDocument
        doc.write()
        doc.close()
        display = actualDisplay(nodeName, doc)
        iframe.detach()
      }
      elemdisplay[nodeName] = display
    }
    return display
  }
  var rmargin = /^margin/
  var rnumnonpx = new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i')
  var getStyles = function (elem) {
    if (elem.ownerDocument.defaultView.opener) {
      return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
    }
    return window.getComputedStyle(elem, null)
  }

  function curCSS (elem, name, computed) {
    var width,
      minWidth,
      maxWidth,
      ret,
      style = elem.style
    computed = computed || getStyles(elem)
    if (computed) {
      ret = computed.getPropertyValue(name) || computed[name]
    }
    if (computed) {
      if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name)
      }
      if (rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width
        minWidth = style.minWidth
        maxWidth = style.maxWidth
        style.minWidth = style.maxWidth = style.width = ret
        ret = computed.width
        style.width = width
        style.minWidth = minWidth
        style.maxWidth = maxWidth
      }
    }
    return ret !== undefined ? ret + '' : ret
  }

  function addGetHookIf (conditionFn, hookFn) {
    return {
      get: function () {
        if (conditionFn()) {
          delete this.get
          return
        }
        return (this.get = hookFn).apply(this, arguments)
      }
    }
  }
  ;(function () {
    var pixelPositionVal,
      boxSizingReliableVal,
      docElem = document.documentElement,
      container = document.createElement('div'),
      div = document.createElement('div')
    if (!div.style) {
      return
    }
    div.style.backgroundClip = 'content-box'
    div.cloneNode(true).style.backgroundClip = ''
    support.clearCloneStyle = div.style.backgroundClip === 'content-box'
    container.style.cssText =
      'border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute'
    container.appendChild(div)

    function computePixelPositionAndBoxSizingReliable () {
      div.style.cssText =
        '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute'
      div.innerHTML = ''
      docElem.appendChild(container)
      var divStyle = window.getComputedStyle(div, null)
      pixelPositionVal = divStyle.top !== '1%'
      boxSizingReliableVal = divStyle.width === '4px'
      docElem.removeChild(container)
    }
    if (window.getComputedStyle) {
      jQuery.extend(support, {
        pixelPosition: function () {
          computePixelPositionAndBoxSizingReliable()
          return pixelPositionVal
        },
        boxSizingReliable: function () {
          if (boxSizingReliableVal == null) {
            computePixelPositionAndBoxSizingReliable()
          }
          return boxSizingReliableVal
        },
        reliableMarginRight: function () {
          var ret,
            marginDiv = div.appendChild(document.createElement('div'))
          marginDiv.style.cssText = div.style.cssText =
            '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0'
          marginDiv.style.marginRight = marginDiv.style.width = '0'
          div.style.width = '1px'
          docElem.appendChild(container)
          ret = !parseFloat(
            window.getComputedStyle(marginDiv, null).marginRight
          )
          docElem.removeChild(container)
          div.removeChild(marginDiv)
          return ret
        }
      })
    }
  })()
  jQuery.swap = function (elem, options, callback, args) {
    var ret,
      name,
      old = {}
    for (name in options) {
      old[name] = elem.style[name]
      elem.style[name] = options[name]
    }
    ret = callback.apply(elem, args || [])
    for (name in options) {
      elem.style[name] = old[name]
    }
    return ret
  }
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    rnumsplit = new RegExp('^(' + pnum + ')(.*)$', 'i'),
    rrelNum = new RegExp('^([+-])=(' + pnum + ')', 'i'),
    cssShow = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    },
    cssNormalTransform = {
      letterSpacing: '0',
      fontWeight: '400'
    },
    cssPrefixes = ['Webkit', 'O', 'Moz', 'ms']

  function vendorPropName (style, name) {
    if (name in style) {
      return name
    }
    var capName = name[0].toUpperCase() + name.slice(1),
      origName = name,
      i = cssPrefixes.length
    while (i--) {
      name = cssPrefixes[i] + capName
      if (name in style) {
        return name
      }
    }
    return origName
  }

  function setPositiveNumber (elem, value, subtract) {
    var matches = rnumsplit.exec(value)
    return matches
      ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px')
      : value
  }

  function augmentWidthOrHeight (elem, name, extra, isBorderBox, styles) {
    var i =
        extra === (isBorderBox ? 'border' : 'content')
          ? 4
          : name === 'width'
          ? 1
          : 0,
      val = 0
    for (; i < 4; i += 2) {
      if (extra === 'margin') {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles)
      }
      if (isBorderBox) {
        if (extra === 'content') {
          val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles)
        }
        if (extra !== 'margin') {
          val -= jQuery.css(
            elem,
            'border' + cssExpand[i] + 'Width',
            true,
            styles
          )
        }
      } else {
        val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles)
        if (extra !== 'padding') {
          val += jQuery.css(
            elem,
            'border' + cssExpand[i] + 'Width',
            true,
            styles
          )
        }
      }
    }
    return val
  }

  function getWidthOrHeight (elem, name, extra) {
    var valueIsBorderBox = true,
      val = name === 'width' ? elem.offsetWidth : elem.offsetHeight,
      styles = getStyles(elem),
      isBorderBox =
        jQuery.css(elem, 'boxSizing', false, styles) === 'border-box'
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles)
      if (val < 0 || val == null) {
        val = elem.style[name]
      }
      if (rnumnonpx.test(val)) {
        return val
      }
      valueIsBorderBox =
        isBorderBox && (support.boxSizingReliable() || val === elem.style[name])
      val = parseFloat(val) || 0
    }
    return (
      val +
      augmentWidthOrHeight(
        elem,
        name,
        extra || (isBorderBox ? 'border' : 'content'),
        valueIsBorderBox,
        styles
      ) +
      'px'
    )
  }

  function showHide (elements, show) {
    var display,
      elem,
      hidden,
      values = [],
      index = 0,
      length = elements.length
    for (; index < length; index++) {
      elem = elements[index]
      if (!elem.style) {
        continue
      }
      values[index] = data_priv.get(elem, 'olddisplay')
      display = elem.style.display
      if (show) {
        if (!values[index] && display === 'none') {
          elem.style.display = ''
        }
        if (elem.style.display === '' && isHidden(elem)) {
          values[index] = data_priv.access(
            elem,
            'olddisplay',
            defaultDisplay(elem.nodeName)
          )
        }
      } else {
        hidden = isHidden(elem)
        if (display !== 'none' || !hidden) {
          data_priv.set(
            elem,
            'olddisplay',
            hidden ? display : jQuery.css(elem, 'display')
          )
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index]
      if (!elem.style) {
        continue
      }
      if (!show || elem.style.display === 'none' || elem.style.display === '') {
        elem.style.display = show ? values[index] || '' : 'none'
      }
    }
    return elements
  }
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, 'opacity')
            return ret === '' ? '1' : ret
          }
        }
      }
    },
    cssNumber: {
      columnCount: true,
      fillOpacity: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true
    },
    cssProps: {
      float: 'cssFloat'
    },
    style: function (elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return
      }
      var ret,
        type,
        hooks,
        origName = jQuery.camelCase(name),
        style = elem.style
      name =
        jQuery.cssProps[origName] ||
        (jQuery.cssProps[origName] = vendorPropName(style, origName))
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]
      if (value !== undefined) {
        type = typeof value
        if (type === 'string' && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name))
          type = 'number'
        }
        if (value == null || value !== value) {
          return
        }
        if (type === 'number' && !jQuery.cssNumber[origName]) {
          value += 'px'
        }
        if (
          !support.clearCloneStyle &&
          value === '' &&
          name.indexOf('background') === 0
        ) {
          style[name] = 'inherit'
        }
        if (
          !hooks ||
          !('set' in hooks) ||
          (value = hooks.set(elem, value, extra)) !== undefined
        ) {
          style[name] = value
        }
      } else {
        if (
          hooks &&
          'get' in hooks &&
          (ret = hooks.get(elem, false, extra)) !== undefined
        ) {
          return ret
        }
        return style[name]
      }
    },
    css: function (elem, name, extra, styles) {
      var val,
        num,
        hooks,
        origName = jQuery.camelCase(name)
      name =
        jQuery.cssProps[origName] ||
        (jQuery.cssProps[origName] = vendorPropName(elem.style, origName))
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName]
      if (hooks && 'get' in hooks) {
        val = hooks.get(elem, true, extra)
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles)
      }
      if (val === 'normal' && name in cssNormalTransform) {
        val = cssNormalTransform[name]
      }
      if (extra === '' || extra) {
        num = parseFloat(val)
        return extra === true || jQuery.isNumeric(num) ? num || 0 : val
      }
      return val
    }
  })
  jQuery.each(['height', 'width'], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {
          return rdisplayswap.test(jQuery.css(elem, 'display')) &&
            elem.offsetWidth === 0
            ? jQuery.swap(elem, cssShow, function () {
                return getWidthOrHeight(elem, name, extra)
              })
            : getWidthOrHeight(elem, name, extra)
        }
      },
      set: function (elem, value, extra) {
        var styles = extra && getStyles(elem)
        return setPositiveNumber(
          elem,
          value,
          extra
            ? augmentWidthOrHeight(
                elem,
                name,
                extra,
                jQuery.css(elem, 'boxSizing', false, styles) === 'border-box',
                styles
              )
            : 0
        )
      }
    }
  })
  jQuery.cssHooks.marginRight = addGetHookIf(
    support.reliableMarginRight,
    function (elem, computed) {
      if (computed) {
        return jQuery.swap(
          elem,
          {
            display: 'inline-block'
          },
          curCSS,
          [elem, 'marginRight']
        )
      }
    }
  )
  jQuery.each(
    {
      margin: '',
      padding: '',
      border: 'Width'
    },
    function (prefix, suffix) {
      jQuery.cssHooks[prefix + suffix] = {
        expand: function (value) {
          var i = 0,
            expanded = {},
            parts = typeof value === 'string' ? value.split(' ') : [value]
          for (; i < 4; i++) {
            expanded[prefix + cssExpand[i] + suffix] =
              parts[i] || parts[i - 2] || parts[0]
          }
          return expanded
        }
      }
      if (!rmargin.test(prefix)) {
        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
      }
    }
  )
  jQuery.fn.extend({
    css: function (name, value) {
      return access(
        this,
        function (elem, name, value) {
          var styles,
            len,
            map = {},
            i = 0
          if (jQuery.isArray(name)) {
            styles = getStyles(elem)
            len = name.length
            for (; i < len; i++) {
              map[name[i]] = jQuery.css(elem, name[i], false, styles)
            }
            return map
          }
          return value !== undefined
            ? jQuery.style(elem, name, value)
            : jQuery.css(elem, name)
        },
        name,
        value,
        arguments.length > 1
      )
    },
    show: function () {
      return showHide(this, true)
    },
    hide: function () {
      return showHide(this)
    },
    toggle: function (state) {
      if (typeof state === 'boolean') {
        return state ? this.show() : this.hide()
      }
      return this.each(function () {
        if (isHidden(this)) {
          jQuery(this).show()
        } else {
          jQuery(this).hide()
        }
      })
    }
  })

  function Tween (elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing)
  }
  jQuery.Tween = Tween
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem
      this.prop = prop
      this.easing = easing || 'swing'
      this.options = options
      this.start = this.now = this.cur()
      this.end = end
      this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px')
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop]
      return hooks && hooks.get
        ? hooks.get(this)
        : Tween.propHooks._default.get(this)
    },
    run: function (percent) {
      var eased,
        hooks = Tween.propHooks[this.prop]
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](
          percent,
          this.options.duration * percent,
          0,
          1,
          this.options.duration
        )
      } else {
        this.pos = eased = percent
      }
      this.now = (this.end - this.start) * eased + this.start
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this)
      }
      if (hooks && hooks.set) {
        hooks.set(this)
      } else {
        Tween.propHooks._default.set(this)
      }
      return this
    }
  }
  Tween.prototype.init.prototype = Tween.prototype
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result
        if (
          tween.elem[tween.prop] != null &&
          (!tween.elem.style || tween.elem.style[tween.prop] == null)
        ) {
          return tween.elem[tween.prop]
        }
        result = jQuery.css(tween.elem, tween.prop, '')
        return !result || result === 'auto' ? 0 : result
      },
      set: function (tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween)
        } else {
          if (
            tween.elem.style &&
            (tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
              jQuery.cssHooks[tween.prop])
          ) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
          } else {
            tween.elem[tween.prop] = tween.now
          }
        }
      }
    }
  }
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now
      }
    }
  }
  jQuery.easing = {
    linear: function (p) {
      return p
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2
    }
  }
  jQuery.fx = Tween.prototype.init
  jQuery.fx.step = {}
  var fxNow,
    timerId,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rfxnum = new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i'),
    rrun = /queueHooks$/,
    animationPrefilters = [defaultPrefilter],
    tweeners = {
      '*': [
        function (prop, value) {
          var tween = this.createTween(prop, value),
            target = tween.cur(),
            parts = rfxnum.exec(value),
            unit = (parts && parts[3]) || (jQuery.cssNumber[prop] ? '' : 'px'),
            start =
              (jQuery.cssNumber[prop] || (unit !== 'px' && +target)) &&
              rfxnum.exec(jQuery.css(tween.elem, prop)),
            scale = 1,
            maxIterations = 20
          if (start && start[3] !== unit) {
            unit = unit || start[3]
            parts = parts || []
            start = +target || 1
            do {
              scale = scale || '.5'
              start = start / scale
              jQuery.style(tween.elem, prop, start + unit)
            } while (
              scale !== (scale = tween.cur() / target) &&
              scale !== 1 &&
              --maxIterations
            )
          }
          if (parts) {
            start = tween.start = +start || +target || 0
            tween.unit = unit
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]
          }
          return tween
        }
      ]
    }

  function createFxNow () {
    setTimeout(function () {
      fxNow = undefined
    })
    return (fxNow = jQuery.now())
  }

  function genFx (type, includeWidth) {
    var which,
      i = 0,
      attrs = {
        height: type
      }
    includeWidth = includeWidth ? 1 : 0
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i]
      attrs['margin' + which] = attrs['padding' + which] = type
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type
    }
    return attrs
  }

  function createTween (value, prop, animation) {
    var tween,
      collection = (tweeners[prop] || []).concat(tweeners['*']),
      index = 0,
      length = collection.length
    for (; index < length; index++) {
      if ((tween = collection[index].call(animation, prop, value))) {
        return tween
      }
    }
  }

  function defaultPrefilter (elem, props, opts) {
    var prop,
      value,
      toggle,
      tween,
      hooks,
      oldfire,
      display,
      checkDisplay,
      anim = this,
      orig = {},
      style = elem.style,
      hidden = elem.nodeType && isHidden(elem),
      dataShow = data_priv.get(elem, 'fxshow')
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, 'fx')
      if (hooks.unqueued == null) {
        hooks.unqueued = 0
        oldfire = hooks.empty.fire
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire()
          }
        }
      }
      hooks.unqueued++
      anim.always(function () {
        anim.always(function () {
          hooks.unqueued--
          if (!jQuery.queue(elem, 'fx').length) {
            hooks.empty.fire()
          }
        })
      })
    }
    if (elem.nodeType === 1 && ('height' in props || 'width' in props)) {
      opts.overflow = [style.overflow, style.overflowX, style.overflowY]
      display = jQuery.css(elem, 'display')
      checkDisplay =
        display === 'none'
          ? data_priv.get(elem, 'olddisplay') || defaultDisplay(elem.nodeName)
          : display
      if (checkDisplay === 'inline' && jQuery.css(elem, 'float') === 'none') {
        style.display = 'inline-block'
      }
    }
    if (opts.overflow) {
      style.overflow = 'hidden'
      anim.always(function () {
        style.overflow = opts.overflow[0]
        style.overflowX = opts.overflow[1]
        style.overflowY = opts.overflow[2]
      })
    }
    for (prop in props) {
      value = props[prop]
      if (rfxtypes.exec(value)) {
        delete props[prop]
        toggle = toggle || value === 'toggle'
        if (value === (hidden ? 'hide' : 'show')) {
          if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
            hidden = true
          } else {
            continue
          }
        }
        orig[prop] = (dataShow && dataShow[prop]) || jQuery.style(elem, prop)
      } else {
        display = undefined
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ('hidden' in dataShow) {
          hidden = dataShow.hidden
        }
      } else {
        dataShow = data_priv.access(elem, 'fxshow', {})
      }
      if (toggle) {
        dataShow.hidden = !hidden
      }
      if (hidden) {
        jQuery(elem).show()
      } else {
        anim.done(function () {
          jQuery(elem).hide()
        })
      }
      anim.done(function () {
        var prop
        data_priv.remove(elem, 'fxshow')
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop])
        }
      })
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim)
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start
          if (hidden) {
            tween.end = tween.start
            tween.start = prop === 'width' || prop === 'height' ? 1 : 0
          }
        }
      }
    } else {
      if (
        (display === 'none' ? defaultDisplay(elem.nodeName) : display) ===
        'inline'
      ) {
        style.display = display
      }
    }
  }

  function propFilter (props, specialEasing) {
    var index, name, easing, value, hooks
    for (index in props) {
      name = jQuery.camelCase(index)
      easing = specialEasing[name]
      value = props[index]
      if (jQuery.isArray(value)) {
        easing = value[1]
        value = props[index] = value[0]
      }
      if (index !== name) {
        props[name] = value
        delete props[index]
      }
      hooks = jQuery.cssHooks[name]
      if (hooks && 'expand' in hooks) {
        value = hooks.expand(value)
        delete props[name]
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index]
            specialEasing[index] = easing
          }
        }
      } else {
        specialEasing[name] = easing
      }
    }
  }

  function Animation (elem, properties, options) {
    var result,
      stopped,
      index = 0,
      length = animationPrefilters.length,
      deferred = jQuery.Deferred().always(function () {
        delete tick.elem
      }),
      tick = function () {
        if (stopped) {
          return false
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(
            0,
            animation.startTime + animation.duration - currentTime
          ),
          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length
        for (; index < length; index++) {
          animation.tweens[index].run(percent)
        }
        deferred.notifyWith(elem, [animation, percent, remaining])
        if (percent < 1 && length) {
          return remaining
        } else {
          deferred.resolveWith(elem, [animation])
          return false
        }
      },
      animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(
          true,
          {
            specialEasing: {}
          },
          options
        ),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(
            elem,
            animation.opts,
            prop,
            end,
            animation.opts.specialEasing[prop] || animation.opts.easing
          )
          animation.tweens.push(tween)
          return tween
        },
        stop: function (gotoEnd) {
          var index = 0,
            length = gotoEnd ? animation.tweens.length : 0
          if (stopped) {
            return this
          }
          stopped = true
          for (; index < length; index++) {
            animation.tweens[index].run(1)
          }
          if (gotoEnd) {
            deferred.resolveWith(elem, [animation, gotoEnd])
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd])
          }
          return this
        }
      }),
      props = animation.props
    propFilter(props, animation.opts.specialEasing)
    for (; index < length; index++) {
      result = animationPrefilters[index].call(
        animation,
        elem,
        props,
        animation.opts
      )
      if (result) {
        return result
      }
    }
    jQuery.map(props, createTween, animation)
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation)
    }
    jQuery.fx.timer(
      jQuery.extend(tick, {
        elem: elem,
        anim: animation,
        queue: animation.opts.queue
      })
    )
    return animation
      .progress(animation.opts.progress)
      .done(animation.opts.done, animation.opts.complete)
      .fail(animation.opts.fail)
      .always(animation.opts.always)
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function (props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props
        props = ['*']
      } else {
        props = props.split(' ')
      }
      var prop,
        index = 0,
        length = props.length
      for (; index < length; index++) {
        prop = props[index]
        tweeners[prop] = tweeners[prop] || []
        tweeners[prop].unshift(callback)
      }
    },
    prefilter: function (callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback)
      } else {
        animationPrefilters.push(callback)
      }
    }
  })
  jQuery.speed = function (speed, easing, fn) {
    var opt =
      speed && typeof speed === 'object'
        ? jQuery.extend({}, speed)
        : {
            complete:
              fn || (!fn && easing) || (jQuery.isFunction(speed) && speed),
            duration: speed,
            easing:
              (fn && easing) || (easing && !jQuery.isFunction(easing) && easing)
          }
    opt.duration = jQuery.fx.off
      ? 0
      : typeof opt.duration === 'number'
      ? opt.duration
      : opt.duration in jQuery.fx.speeds
      ? jQuery.fx.speeds[opt.duration]
      : jQuery.fx.speeds._default
    if (opt.queue == null || opt.queue === true) {
      opt.queue = 'fx'
    }
    opt.old = opt.complete
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this)
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue)
      }
    }
    return opt
  }
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden)
        .css('opacity', 0)
        .show()
        .end()
        .animate(
          {
            opacity: to
          },
          speed,
          easing,
          callback
        )
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall)
          if (empty || data_priv.get(this, 'finish')) {
            anim.stop(true)
          }
        }
      doAnimation.finish = doAnimation
      return empty || optall.queue === false
        ? this.each(doAnimation)
        : this.queue(optall.queue, doAnimation)
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop
        delete hooks.stop
        stop(gotoEnd)
      }
      if (typeof type !== 'string') {
        gotoEnd = clearQueue
        clearQueue = type
        type = undefined
      }
      if (clearQueue && type !== false) {
        this.queue(type || 'fx', [])
      }
      return this.each(function () {
        var dequeue = true,
          index = type != null && type + 'queueHooks',
          timers = jQuery.timers,
          data = data_priv.get(this)
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index])
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index])
            }
          }
        }
        for (index = timers.length; index--; ) {
          if (
            timers[index].elem === this &&
            (type == null || timers[index].queue === type)
          ) {
            timers[index].anim.stop(gotoEnd)
            dequeue = false
            timers.splice(index, 1)
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type)
        }
      })
    },
    finish: function (type) {
      if (type !== false) {
        type = type || 'fx'
      }
      return this.each(function () {
        var index,
          data = data_priv.get(this),
          queue = data[type + 'queue'],
          hooks = data[type + 'queueHooks'],
          timers = jQuery.timers,
          length = queue ? queue.length : 0
        data.finish = true
        jQuery.queue(this, type, [])
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true)
        }
        for (index = timers.length; index--; ) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true)
            timers.splice(index, 1)
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this)
          }
        }
        delete data.finish
      })
    }
  })
  jQuery.each(['toggle', 'show', 'hide'], function (i, name) {
    var cssFn = jQuery.fn[name]
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === 'boolean'
        ? cssFn.apply(this, arguments)
        : this.animate(genFx(name, true), speed, easing, callback)
    }
  })
  jQuery.each(
    {
      slideDown: genFx('show'),
      slideUp: genFx('hide'),
      slideToggle: genFx('toggle'),
      fadeIn: {
        opacity: 'show'
      },
      fadeOut: {
        opacity: 'hide'
      },
      fadeToggle: {
        opacity: 'toggle'
      }
    },
    function (name, props) {
      jQuery.fn[name] = function (speed, easing, callback) {
        return this.animate(props, speed, easing, callback)
      }
    }
  )
  jQuery.timers = []
  jQuery.fx.tick = function () {
    var timer,
      i = 0,
      timers = jQuery.timers
    fxNow = jQuery.now()
    for (; i < timers.length; i++) {
      timer = timers[i]
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1)
      }
    }
    if (!timers.length) {
      jQuery.fx.stop()
    }
    fxNow = undefined
  }
  jQuery.fx.timer = function (timer) {
    jQuery.timers.push(timer)
    if (timer()) {
      jQuery.fx.start()
    } else {
      jQuery.timers.pop()
    }
  }
  jQuery.fx.interval = 13
  jQuery.fx.start = function () {
    if (!timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
    }
  }
  jQuery.fx.stop = function () {
    clearInterval(timerId)
    timerId = null
  }
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }
  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time
    type = type || 'fx'
    return this.queue(type, function (next, hooks) {
      var timeout = setTimeout(next, time)
      hooks.stop = function () {
        clearTimeout(timeout)
      }
    })
  }
  ;(function () {
    var input = document.createElement('input'),
      select = document.createElement('select'),
      opt = select.appendChild(document.createElement('option'))
    input.type = 'checkbox'
    support.checkOn = input.value !== ''
    support.optSelected = opt.selected
    select.disabled = true
    support.optDisabled = !opt.disabled
    input = document.createElement('input')
    input.value = 't'
    input.type = 'radio'
    support.radioValue = input.value === 't'
  })()
  var nodeHook,
    boolHook,
    attrHandle = jQuery.expr.attrHandle
  jQuery.fn.extend({
    attr: function (name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1)
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name)
      })
    }
  })
  jQuery.extend({
    attr: function (elem, name, value) {
      var hooks,
        ret,
        nType = elem.nodeType
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return
      }
      if (typeof elem.getAttribute === strundefined) {
        return jQuery.prop(elem, name, value)
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase()
        hooks =
          jQuery.attrHooks[name] ||
          (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name)
        } else {
          if (
            hooks &&
            'set' in hooks &&
            (ret = hooks.set(elem, value, name)) !== undefined
          ) {
            return ret
          } else {
            elem.setAttribute(name, value + '')
            return value
          }
        }
      } else {
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret
        } else {
          ret = jQuery.find.attr(elem, name)
          return ret == null ? undefined : ret
        }
      }
    },
    removeAttr: function (elem, value) {
      var name,
        propName,
        i = 0,
        attrNames = value && value.match(rnotwhite)
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          propName = jQuery.propFix[name] || name
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false
          }
          elem.removeAttribute(name)
        }
      }
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (
            !support.radioValue &&
            value === 'radio' &&
            jQuery.nodeName(elem, 'input')
          ) {
            var val = elem.value
            elem.setAttribute('type', value)
            if (val) {
              elem.value = val
            }
            return value
          }
        }
      }
    }
  })
  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name)
      } else {
        elem.setAttribute(name, name)
      }
      return name
    }
  }
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = attrHandle[name] || jQuery.find.attr
    attrHandle[name] = function (elem, name, isXML) {
      var ret, handle
      if (!isXML) {
        handle = attrHandle[name]
        attrHandle[name] = ret
        ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null
        attrHandle[name] = handle
      }
      return ret
    }
  })
  var rfocusable = /^(?:input|select|textarea|button)$/i
  jQuery.fn.extend({
    prop: function (name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1)
    },
    removeProp: function (name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name]
      })
    }
  })
  jQuery.extend({
    propFix: {
      for: 'htmlFor',
      class: 'className'
    },
    prop: function (elem, name, value) {
      var ret,
        hooks,
        notxml,
        nType = elem.nodeType
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem)
      if (notxml) {
        name = jQuery.propFix[name] || name
        hooks = jQuery.propHooks[name]
      }
      if (value !== undefined) {
        return hooks &&
          'set' in hooks &&
          (ret = hooks.set(elem, value, name)) !== undefined
          ? ret
          : (elem[name] = value)
      } else {
        return hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null
          ? ret
          : elem[name]
      }
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          return elem.hasAttribute('tabindex') ||
            rfocusable.test(elem.nodeName) ||
            elem.href
            ? elem.tabIndex
            : -1
        }
      }
    }
  })
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        var parent = elem.parentNode
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex
        }
        return null
      }
    }
  }
  jQuery.each(
    [
      'tabIndex',
      'readOnly',
      'maxLength',
      'cellSpacing',
      'cellPadding',
      'rowSpan',
      'colSpan',
      'useMap',
      'frameBorder',
      'contentEditable'
    ],
    function () {
      jQuery.propFix[this.toLowerCase()] = this
    }
  )
  var rclass = /[\t\r\n\f]/g
  jQuery.fn.extend({
    addClass: function (value) {
      var classes,
        elem,
        cur,
        clazz,
        j,
        finalValue,
        proceed = typeof value === 'string' && value,
        i = 0,
        len = this.length
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, this.className))
        })
      }
      if (proceed) {
        classes = (value || '').match(rnotwhite) || []
        for (; i < len; i++) {
          elem = this[i]
          cur =
            elem.nodeType === 1 &&
            (elem.className
              ? (' ' + elem.className + ' ').replace(rclass, ' ')
              : ' ')
          if (cur) {
            j = 0
            while ((clazz = classes[j++])) {
              if (cur.indexOf(' ' + clazz + ' ') < 0) {
                cur += clazz + ' '
              }
            }
            finalValue = jQuery.trim(cur)
            if (elem.className !== finalValue) {
              elem.className = finalValue
            }
          }
        }
      }
      return this
    },
    removeClass: function (value) {
      var classes,
        elem,
        cur,
        clazz,
        j,
        finalValue,
        proceed =
          arguments.length === 0 || (typeof value === 'string' && value),
        i = 0,
        len = this.length
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, this.className))
        })
      }
      if (proceed) {
        classes = (value || '').match(rnotwhite) || []
        for (; i < len; i++) {
          elem = this[i]
          cur =
            elem.nodeType === 1 &&
            (elem.className
              ? (' ' + elem.className + ' ').replace(rclass, ' ')
              : '')
          if (cur) {
            j = 0
            while ((clazz = classes[j++])) {
              while (cur.indexOf(' ' + clazz + ' ') >= 0) {
                cur = cur.replace(' ' + clazz + ' ', ' ')
              }
            }
            finalValue = value ? jQuery.trim(cur) : ''
            if (elem.className !== finalValue) {
              elem.className = finalValue
            }
          }
        }
      }
      return this
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value
      if (typeof stateVal === 'boolean' && type === 'string') {
        return stateVal ? this.addClass(value) : this.removeClass(value)
      }
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(
            value.call(this, i, this.className, stateVal),
            stateVal
          )
        })
      }
      return this.each(function () {
        if (type === 'string') {
          var className,
            i = 0,
            self = jQuery(this),
            classNames = value.match(rnotwhite) || []
          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className)
            } else {
              self.addClass(className)
            }
          }
        } else {
          if (type === strundefined || type === 'boolean') {
            if (this.className) {
              data_priv.set(this, '__className__', this.className)
            }
            this.className =
              this.className || value === false
                ? ''
                : data_priv.get(this, '__className__') || ''
          }
        }
      })
    },
    hasClass: function (selector) {
      var className = ' ' + selector + ' ',
        i = 0,
        l = this.length
      for (; i < l; i++) {
        if (
          this[i].nodeType === 1 &&
          (' ' + this[i].className + ' ')
            .replace(rclass, ' ')
            .indexOf(className) >= 0
        ) {
          return true
        }
      }
      return false
    }
  })
  var rreturn = /\r/g
  jQuery.fn.extend({
    val: function (value) {
      var hooks,
        ret,
        isFunction,
        elem = this[0]
      if (!arguments.length) {
        if (elem) {
          hooks =
            jQuery.valHooks[elem.type] ||
            jQuery.valHooks[elem.nodeName.toLowerCase()]
          if (
            hooks &&
            'get' in hooks &&
            (ret = hooks.get(elem, 'value')) !== undefined
          ) {
            return ret
          }
          ret = elem.value
          return typeof ret === 'string'
            ? ret.replace(rreturn, '')
            : ret == null
            ? ''
            : ret
        }
        return
      }
      isFunction = jQuery.isFunction(value)
      return this.each(function (i) {
        var val
        if (this.nodeType !== 1) {
          return
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val())
        } else {
          val = value
        }
        if (val == null) {
          val = ''
        } else {
          if (typeof val === 'number') {
            val += ''
          } else {
            if (jQuery.isArray(val)) {
              val = jQuery.map(val, function (value) {
                return value == null ? '' : value + ''
              })
            }
          }
        }
        hooks =
          jQuery.valHooks[this.type] ||
          jQuery.valHooks[this.nodeName.toLowerCase()]
        if (
          !hooks ||
          !('set' in hooks) ||
          hooks.set(this, val, 'value') === undefined
        ) {
          this.value = val
        }
      })
    }
  })
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = jQuery.find.attr(elem, 'value')
          return val != null ? val : jQuery.trim(jQuery.text(elem))
        }
      },
      select: {
        get: function (elem) {
          var value,
            option,
            options = elem.options,
            index = elem.selectedIndex,
            one = elem.type === 'select-one' || index < 0,
            values = one ? null : [],
            max = one ? index + 1 : options.length,
            i = index < 0 ? max : one ? index : 0
          for (; i < max; i++) {
            option = options[i]
            if (
              (option.selected || i === index) &&
              (support.optDisabled
                ? !option.disabled
                : option.getAttribute('disabled') === null) &&
              (!option.parentNode.disabled ||
                !jQuery.nodeName(option.parentNode, 'optgroup'))
            ) {
              value = jQuery(option).val()
              if (one) {
                return value
              }
              values.push(value)
            }
          }
          return values
        },
        set: function (elem, value) {
          var optionSet,
            option,
            options = elem.options,
            values = jQuery.makeArray(value),
            i = options.length
          while (i--) {
            option = options[i]
            if ((option.selected = jQuery.inArray(option.value, values) >= 0)) {
              optionSet = true
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1
          }
          return values
        }
      }
    }
  })
  jQuery.each(['radio', 'checkbox'], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (jQuery.isArray(value)) {
          return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
        }
      }
    }
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute('value') === null ? 'on' : elem.value
      }
    }
  })
  jQuery.each(
    'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(
      ' '
    ),
    function (i, name) {
      jQuery.fn[name] = function (data, fn) {
        return arguments.length > 0
          ? this.on(name, null, data, fn)
          : this.trigger(name)
      }
    }
  )
  jQuery.fn.extend({
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
    },
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn)
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn)
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn)
    },
    undelegate: function (selector, types, fn) {
      return arguments.length === 1
        ? this.off(selector, '**')
        : this.off(types, selector || '**', fn)
    }
  })
  var nonce = jQuery.now()
  var rquery = /\?/
  jQuery.parseJSON = function (data) {
    return JSON.parse(data + '')
  }
  jQuery.parseXML = function (data) {
    var xml, tmp
    if (!data || typeof data !== 'string') {
      return null
    }
    try {
      tmp = new DOMParser()
      xml = tmp.parseFromString(data, 'text/xml')
    } catch (e) {
      xml = undefined
    }
    if (!xml || xml.getElementsByTagName('parsererror').length) {
      jQuery.error('Invalid XML: ' + data)
    }
    return xml
  }
  var rhash = /#.*$/,
    rts = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    prefilters = {},
    transports = {},
    allTypes = '*/'.concat('*'),
    ajaxLocation = window.location.href,
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []

  function addToPrefiltersOrTransports (structure) {
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== 'string') {
        func = dataTypeExpression
        dataTypeExpression = '*'
      }
      var dataType,
        i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || []
      if (jQuery.isFunction(func)) {
        while ((dataType = dataTypes[i++])) {
          if (dataType[0] === '+') {
            dataType = dataType.slice(1) || '*'
            ;(structure[dataType] = structure[dataType] || []).unshift(func)
          } else {
            ;(structure[dataType] = structure[dataType] || []).push(func)
          }
        }
      }
    }
  }

  function inspectPrefiltersOrTransports (
    structure,
    options,
    originalOptions,
    jqXHR
  ) {
    var inspected = {},
      seekingTransport = structure === transports

    function inspect (dataType) {
      var selected
      inspected[dataType] = true
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(
          options,
          originalOptions,
          jqXHR
        )
        if (
          typeof dataTypeOrTransport === 'string' &&
          !seekingTransport &&
          !inspected[dataTypeOrTransport]
        ) {
          options.dataTypes.unshift(dataTypeOrTransport)
          inspect(dataTypeOrTransport)
          return false
        } else {
          if (seekingTransport) {
            return !(selected = dataTypeOrTransport)
          }
        }
      })
      return selected
    }
    return inspect(options.dataTypes[0]) || (!inspected['*'] && inspect('*'))
  }

  function ajaxExtend (target, src) {
    var key,
      deep,
      flatOptions = jQuery.ajaxSettings.flatOptions || {}
    for (key in src) {
      if (src[key] !== undefined) {
        ;(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep)
    }
    return target
  }

  function ajaxHandleResponses (s, jqXHR, responses) {
    var ct,
      type,
      finalDataType,
      firstDataType,
      contents = s.contents,
      dataTypes = s.dataTypes
    while (dataTypes[0] === '*') {
      dataTypes.shift()
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader('Content-Type')
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type)
          break
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0]
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
          finalDataType = type
          break
        }
        if (!firstDataType) {
          firstDataType = type
        }
      }
      finalDataType = finalDataType || firstDataType
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType)
      }
      return responses[finalDataType]
    }
  }

  function ajaxConvert (s, response, jqXHR, isSuccess) {
    var conv2,
      current,
      conv,
      tmp,
      prev,
      converters = {},
      dataTypes = s.dataTypes.slice()
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv]
      }
    }
    current = dataTypes.shift()
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType)
      }
      prev = current
      current = dataTypes.shift()
      if (current) {
        if (current === '*') {
          current = prev
        } else {
          if (prev !== '*' && prev !== current) {
            conv =
              converters[prev + ' ' + current] || converters['* ' + current]
            if (!conv) {
              for (conv2 in converters) {
                tmp = conv2.split(' ')
                if (tmp[1] === current) {
                  conv =
                    converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]]
                  if (conv) {
                    if (conv === true) {
                      conv = converters[conv2]
                    } else {
                      if (converters[conv2] !== true) {
                        current = tmp[0]
                        dataTypes.unshift(tmp[1])
                      }
                    }
                    break
                  }
                }
              }
            }
            if (conv !== true) {
              if (conv && s['throws']) {
                response = conv(response)
              } else {
                try {
                  response = conv(response)
                } catch (e) {
                  return {
                    state: 'parsererror',
                    error: conv
                      ? e
                      : 'No conversion from ' + prev + ' to ' + current
                  }
                }
              }
            }
          }
        }
      }
    }
    return {
      state: 'success',
      data: response
    }
  }
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: 'GET',
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': allTypes,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON'
      },
      converters: {
        '* text': String,
        'text html': true,
        'text json': jQuery.parseJSON,
        'text xml': jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function (target, settings) {
      return settings
        ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
        : ajaxExtend(jQuery.ajaxSettings, target)
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      if (typeof url === 'object') {
        options = url
        url = undefined
      }
      options = options || {}
      var transport,
        cacheURL,
        responseHeadersString,
        responseHeaders,
        timeoutTimer,
        parts,
        fireGlobals,
        i,
        s = jQuery.ajaxSetup({}, options),
        callbackContext = s.context || s,
        globalEventContext =
          s.context && (callbackContext.nodeType || callbackContext.jquery)
            ? jQuery(callbackContext)
            : jQuery.event,
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks('once memory'),
        statusCode = s.statusCode || {},
        requestHeaders = {},
        requestHeadersNames = {},
        state = 0,
        strAbort = 'canceled',
        jqXHR = {
          readyState: 0,
          getResponseHeader: function (key) {
            var match
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {}
                while ((match = rheaders.exec(responseHeadersString))) {
                  responseHeaders[match[1].toLowerCase()] = match[2]
                }
              }
              match = responseHeaders[key.toLowerCase()]
            }
            return match == null ? null : match
          },
          getAllResponseHeaders: function () {
            return state === 2 ? responseHeadersString : null
          },
          setRequestHeader: function (name, value) {
            var lname = name.toLowerCase()
            if (!state) {
              name = requestHeadersNames[lname] =
                requestHeadersNames[lname] || name
              requestHeaders[name] = value
            }
            return this
          },
          overrideMimeType: function (type) {
            if (!state) {
              s.mimeType = type
            }
            return this
          },
          statusCode: function (map) {
            var code
            if (map) {
              if (state < 2) {
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]]
                }
              } else {
                jqXHR.always(map[jqXHR.status])
              }
            }
            return this
          },
          abort: function (statusText) {
            var finalText = statusText || strAbort
            if (transport) {
              transport.abort(finalText)
            }
            done(0, finalText)
            return this
          }
        }
      deferred.promise(jqXHR).complete = completeDeferred.add
      jqXHR.success = jqXHR.done
      jqXHR.error = jqXHR.fail
      s.url = ((url || s.url || ajaxLocation) + '')
        .replace(rhash, '')
        .replace(rprotocol, ajaxLocParts[1] + '//')
      s.type = options.method || options.type || s.method || s.type
      s.dataTypes = jQuery
        .trim(s.dataType || '*')
        .toLowerCase()
        .match(rnotwhite) || ['']
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase())
        s.crossDomain = !!(
          parts &&
          (parts[1] !== ajaxLocParts[1] ||
            parts[2] !== ajaxLocParts[2] ||
            (parts[3] || (parts[1] === 'http:' ? '80' : '443')) !==
              (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? '80' : '443')))
        )
      }
      if (s.data && s.processData && typeof s.data !== 'string') {
        s.data = jQuery.param(s.data, s.traditional)
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR)
      if (state === 2) {
        return jqXHR
      }
      fireGlobals = jQuery.event && s.global
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger('ajaxStart')
      }
      s.type = s.type.toUpperCase()
      s.hasContent = !rnoContent.test(s.type)
      cacheURL = s.url
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = s.url += (rquery.test(cacheURL) ? '&' : '?') + s.data
          delete s.data
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL)
            ? cacheURL.replace(rts, '$1_=' + nonce++)
            : cacheURL + (rquery.test(cacheURL) ? '&' : '?') + '_=' + nonce++
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader(
            'If-Modified-Since',
            jQuery.lastModified[cacheURL]
          )
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL])
        }
      }
      if (
        (s.data && s.hasContent && s.contentType !== false) ||
        options.contentType
      ) {
        jqXHR.setRequestHeader('Content-Type', s.contentType)
      }
      jqXHR.setRequestHeader(
        'Accept',
        s.dataTypes[0] && s.accepts[s.dataTypes[0]]
          ? s.accepts[s.dataTypes[0]] +
              (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '')
          : s.accepts['*']
      )
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i])
      }
      if (
        s.beforeSend &&
        (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)
      ) {
        return jqXHR.abort()
      }
      strAbort = 'abort'
      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        jqXHR[i](s[i])
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)
      if (!transport) {
        done(-1, 'No Transport')
      } else {
        jqXHR.readyState = 1
        if (fireGlobals) {
          globalEventContext.trigger('ajaxSend', [jqXHR, s])
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function () {
            jqXHR.abort('timeout')
          }, s.timeout)
        }
        try {
          state = 1
          transport.send(requestHeaders, done)
        } catch (e) {
          if (state < 2) {
            done(-1, e)
          } else {
            throw e
          }
        }
      }

      function done (status, nativeStatusText, responses, headers) {
        var isSuccess,
          success,
          error,
          response,
          modified,
          statusText = nativeStatusText
        if (state === 2) {
          return
        }
        state = 2
        if (timeoutTimer) {
          clearTimeout(timeoutTimer)
        }
        transport = undefined
        responseHeadersString = headers || ''
        jqXHR.readyState = status > 0 ? 4 : 0
        isSuccess = (status >= 200 && status < 300) || status === 304
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses)
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess)
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader('Last-Modified')
            if (modified) {
              jQuery.lastModified[cacheURL] = modified
            }
            modified = jqXHR.getResponseHeader('etag')
            if (modified) {
              jQuery.etag[cacheURL] = modified
            }
          }
          if (status === 204 || s.type === 'HEAD') {
            statusText = 'nocontent'
          } else {
            if (status === 304) {
              statusText = 'notmodified'
            } else {
              statusText = response.state
              success = response.data
              error = response.error
              isSuccess = !error
            }
          }
        } else {
          error = statusText
          if (status || !statusText) {
            statusText = 'error'
            if (status < 0) {
              status = 0
            }
          }
        }
        jqXHR.status = status
        jqXHR.statusText = (nativeStatusText || statusText) + ''
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
        }
        jqXHR.statusCode(statusCode)
        statusCode = undefined
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
            jqXHR,
            s,
            isSuccess ? success : error
          ])
        }
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText])
        if (fireGlobals) {
          globalEventContext.trigger('ajaxComplete', [jqXHR, s])
          if (!--jQuery.active) {
            jQuery.event.trigger('ajaxStop')
          }
        }
      }
      return jqXHR
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, 'json')
    },
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, 'script')
    }
  })
  jQuery.each(['get', 'post'], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback
        callback = data
        data = undefined
      }
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      })
    }
  })
  jQuery._evalUrl = function (url) {
    return jQuery.ajax({
      url: url,
      type: 'GET',
      dataType: 'script',
      async: false,
      global: false,
      throws: true
    })
  }
  jQuery.fn.extend({
    wrapAll: function (html) {
      var wrap
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i))
        })
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument)
          .eq(0)
          .clone(true)
        if (this[0].parentNode) {
          wrap.insertBefore(this[0])
        }
        wrap
          .map(function () {
            var elem = this
            while (elem.firstElementChild) {
              elem = elem.firstElementChild
            }
            return elem
          })
          .append(this)
      }
      return this
    },
    wrapInner: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i))
        })
      }
      return this.each(function () {
        var self = jQuery(this),
          contents = self.contents()
        if (contents.length) {
          contents.wrapAll(html)
        } else {
          self.append(html)
        }
      })
    },
    wrap: function (html) {
      var isFunction = jQuery.isFunction(html)
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
      })
    },
    unwrap: function () {
      return this.parent()
        .each(function () {
          if (!jQuery.nodeName(this, 'body')) {
            jQuery(this).replaceWith(this.childNodes)
          }
        })
        .end()
    }
  })
  jQuery.expr.filters.hidden = function (elem) {
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
  }
  jQuery.expr.filters.visible = function (elem) {
    return !jQuery.expr.filters.hidden(elem)
  }
  var r20 = /%20/g,
    rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i

  function buildParams (prefix, obj, traditional, add) {
    var name
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v)
        } else {
          buildParams(
            prefix + '[' + (typeof v === 'object' ? i : '') + ']',
            v,
            traditional,
            add
          )
        }
      })
    } else {
      if (!traditional && jQuery.type(obj) === 'object') {
        for (name in obj) {
          buildParams(prefix + '[' + name + ']', obj[name], traditional, add)
        }
      } else {
        add(prefix, obj)
      }
    }
  }
  jQuery.param = function (a, traditional) {
    var prefix,
      s = [],
      add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : value == null ? '' : value
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value)
      }
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
    }
    if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
      jQuery.each(a, function () {
        add(this.name, this.value)
      })
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add)
      }
    }
    return s.join('&').replace(r20, '+')
  }
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray())
    },
    serializeArray: function () {
      return this.map(function () {
        var elements = jQuery.prop(this, 'elements')
        return elements ? jQuery.makeArray(elements) : this
      })
        .filter(function () {
          var type = this.type
          return (
            this.name &&
            !jQuery(this).is(':disabled') &&
            rsubmittable.test(this.nodeName) &&
            !rsubmitterTypes.test(type) &&
            (this.checked || !rcheckableType.test(type))
          )
        })
        .map(function (i, elem) {
          var val = jQuery(this).val()
          return val == null
            ? null
            : jQuery.isArray(val)
            ? jQuery.map(val, function (val) {
                return {
                  name: elem.name,
                  value: val.replace(rCRLF, '\r\n')
                }
              })
            : {
                name: elem.name,
                value: val.replace(rCRLF, '\r\n')
              }
        })
        .get()
    }
  })
  jQuery.ajaxSettings.xhr = function () {
    try {
      return new XMLHttpRequest()
    } catch (e) {}
  }
  var xhrId = 0,
    xhrCallbacks = {},
    xhrSuccessStatus = {
      0: 200,
      1223: 204
    },
    xhrSupported = jQuery.ajaxSettings.xhr()
  if (window.attachEvent) {
    window.attachEvent('onunload', function () {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key]()
      }
    })
  }
  support.cors = !!xhrSupported && 'withCredentials' in xhrSupported
  support.ajax = xhrSupported = !!xhrSupported
  jQuery.ajaxTransport(function (options) {
    var callback
    if (support.cors || (xhrSupported && !options.crossDomain)) {
      return {
        send: function (headers, complete) {
          var i,
            xhr = options.xhr(),
            id = ++xhrId
          xhr.open(
            options.type,
            options.url,
            options.async,
            options.username,
            options.password
          )
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i]
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType)
          }
          if (!options.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest'
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i])
          }
          callback = function (type) {
            return function () {
              if (callback) {
                delete xhrCallbacks[id]
                callback = xhr.onload = xhr.onerror = null
                if (type === 'abort') {
                  xhr.abort()
                } else {
                  if (type === 'error') {
                    complete(xhr.status, xhr.statusText)
                  } else {
                    complete(
                      xhrSuccessStatus[xhr.status] || xhr.status,
                      xhr.statusText,
                      typeof xhr.responseText === 'string'
                        ? {
                            text: xhr.responseText
                          }
                        : undefined,
                      xhr.getAllResponseHeaders()
                    )
                  }
                }
              }
            }
          }
          xhr.onload = callback()
          xhr.onerror = callback('error')
          callback = xhrCallbacks[id] = callback('abort')
          try {
            xhr.send((options.hasContent && options.data) || null)
          } catch (e) {
            if (callback) {
              throw e
            }
          }
        },
        abort: function () {
          if (callback) {
            callback()
          }
        }
      }
    }
  })
  jQuery.ajaxSetup({
    accepts: {
      script:
        'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      'text script': function (text) {
        jQuery.globalEval(text)
        return text
      }
    }
  })
  jQuery.ajaxPrefilter('script', function (s) {
    if (s.cache === undefined) {
      s.cache = false
    }
    if (s.crossDomain) {
      s.type = 'GET'
    }
  })
  jQuery.ajaxTransport('script', function (s) {
    if (s.crossDomain) {
      var script, callback
      return {
        send: function (_, complete) {
          script = jQuery('<script>')
            .prop({
              async: true,
              charset: s.scriptCharset,
              src: s.url
            })
            .on(
              'load error',
              (callback = function (evt) {
                script.remove()
                callback = null
                if (evt) {
                  complete(evt.type === 'error' ? 404 : 200, evt.type)
                }
              })
            )
          document.head.appendChild(script[0])
        },
        abort: function () {
          if (callback) {
            callback()
          }
        }
      }
    }
  })
  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/
  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + '_' + nonce++
      this[callback] = true
      return callback
    }
  })
  jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
    var callbackName,
      overwritten,
      responseContainer,
      jsonProp =
        s.jsonp !== false &&
        (rjsonp.test(s.url)
          ? 'url'
          : typeof s.data === 'string' &&
            !(s.contentType || '').indexOf(
              'application/x-www-form-urlencoded'
            ) &&
            rjsonp.test(s.data) &&
            'data')
    if (jsonProp || s.dataTypes[0] === 'jsonp') {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback)
        ? s.jsonpCallback()
        : s.jsonpCallback
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName)
      } else {
        if (s.jsonp !== false) {
          s.url +=
            (rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName
        }
      }
      s.converters['script json'] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + ' was not called')
        }
        return responseContainer[0]
      }
      s.dataTypes[0] = 'json'
      overwritten = window[callbackName]
      window[callbackName] = function () {
        responseContainer = arguments
      }
      jqXHR.always(function () {
        window[callbackName] = overwritten
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback
          oldCallbacks.push(callbackName)
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0])
        }
        responseContainer = overwritten = undefined
      })
      return 'script'
    }
  })
  jQuery.parseHTML = function (data, context, keepScripts) {
    if (!data || typeof data !== 'string') {
      return null
    }
    if (typeof context === 'boolean') {
      keepScripts = context
      context = false
    }
    context = context || document
    var parsed = rsingleTag.exec(data),
      scripts = !keepScripts && []
    if (parsed) {
      return [context.createElement(parsed[1])]
    }
    parsed = jQuery.buildFragment([data], context, scripts)
    if (scripts && scripts.length) {
      jQuery(scripts).remove()
    }
    return jQuery.merge([], parsed.childNodes)
  }
  var _load = jQuery.fn.load
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== 'string' && _load) {
      return _load.apply(this, arguments)
    }
    var selector,
      type,
      response,
      self = this,
      off = url.indexOf(' ')
    if (off >= 0) {
      selector = jQuery.trim(url.slice(off))
      url = url.slice(0, off)
    }
    if (jQuery.isFunction(params)) {
      callback = params
      params = undefined
    } else {
      if (params && typeof params === 'object') {
        type = 'POST'
      }
    }
    if (self.length > 0) {
      jQuery
        .ajax({
          url: url,
          type: type,
          dataType: 'html',
          data: params
        })
        .done(function (responseText) {
          response = arguments
          self.html(
            selector
              ? jQuery('<div>')
                  .append(jQuery.parseHTML(responseText))
                  .find(selector)
              : responseText
          )
        })
        .complete(
          callback &&
            function (jqXHR, status) {
              self.each(
                callback,
                response || [jqXHR.responseText, status, jqXHR]
              )
            }
        )
    }
    return this
  }
  jQuery.each(
    [
      'ajaxStart',
      'ajaxStop',
      'ajaxComplete',
      'ajaxError',
      'ajaxSuccess',
      'ajaxSend'
    ],
    function (i, type) {
      jQuery.fn[type] = function (fn) {
        return this.on(type, fn)
      }
    }
  )
  jQuery.expr.filters.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem
    }).length
  }
  var docElem = window.document.documentElement

  function getWindow (elem) {
    return jQuery.isWindow(elem)
      ? elem
      : elem.nodeType === 9 && elem.defaultView
  }
  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var curPosition,
        curLeft,
        curCSSTop,
        curTop,
        curOffset,
        curCSSLeft,
        calculatePosition,
        position = jQuery.css(elem, 'position'),
        curElem = jQuery(elem),
        props = {}
      if (position === 'static') {
        elem.style.position = 'relative'
      }
      curOffset = curElem.offset()
      curCSSTop = jQuery.css(elem, 'top')
      curCSSLeft = jQuery.css(elem, 'left')
      calculatePosition =
        (position === 'absolute' || position === 'fixed') &&
        (curCSSTop + curCSSLeft).indexOf('auto') > -1
      if (calculatePosition) {
        curPosition = curElem.position()
        curTop = curPosition.top
        curLeft = curPosition.left
      } else {
        curTop = parseFloat(curCSSTop) || 0
        curLeft = parseFloat(curCSSLeft) || 0
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset)
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft
      }
      if ('using' in options) {
        options.using.call(elem, props)
      } else {
        curElem.css(props)
      }
    }
  }
  jQuery.fn.extend({
    offset: function (options) {
      if (arguments.length) {
        return options === undefined
          ? this
          : this.each(function (i) {
              jQuery.offset.setOffset(this, options, i)
            })
      }
      var docElem,
        win,
        elem = this[0],
        box = {
          top: 0,
          left: 0
        },
        doc = elem && elem.ownerDocument
      if (!doc) {
        return
      }
      docElem = doc.documentElement
      if (!jQuery.contains(docElem, elem)) {
        return box
      }
      if (typeof elem.getBoundingClientRect !== strundefined) {
        box = elem.getBoundingClientRect()
      }
      win = getWindow(doc)
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft
      }
    },
    position: function () {
      if (!this[0]) {
        return
      }
      var offsetParent,
        offset,
        elem = this[0],
        parentOffset = {
          top: 0,
          left: 0
        }
      if (jQuery.css(elem, 'position') === 'fixed') {
        offset = elem.getBoundingClientRect()
      } else {
        offsetParent = this.offsetParent()
        offset = this.offset()
        if (!jQuery.nodeName(offsetParent[0], 'html')) {
          parentOffset = offsetParent.offset()
        }
        parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', true)
        parentOffset.left += jQuery.css(
          offsetParent[0],
          'borderLeftWidth',
          true
        )
      }
      return {
        top:
          offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
        left:
          offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
      }
    },
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent || docElem
        while (
          offsetParent &&
          !jQuery.nodeName(offsetParent, 'html') &&
            jQuery.css(offsetParent, 'position') === 'static'
        ) {
          offsetParent = offsetParent.offsetParent
        }
        return offsetParent || docElem
      })
    }
  })
  jQuery.each(
    {
      scrollLeft: 'pageXOffset',
      scrollTop: 'pageYOffset'
    },
    function (method, prop) {
      var top = 'pageYOffset' === prop
      jQuery.fn[method] = function (val) {
        return access(
          this,
          function (elem, method, val) {
            var win = getWindow(elem)
            if (val === undefined) {
              return win ? win[prop] : elem[method]
            }
            if (win) {
              win.scrollTo(
                !top ? val : window.pageXOffset,
                top ? val : window.pageYOffset
              )
            } else {
              elem[method] = val
            }
          },
          method,
          val,
          arguments.length,
          null
        )
      }
    }
  )
  jQuery.each(['top', 'left'], function (i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (
      elem,
      computed
    ) {
      if (computed) {
        computed = curCSS(elem, prop)
        return rnumnonpx.test(computed)
          ? jQuery(elem).position()[prop] + 'px'
          : computed
      }
    })
  })
  jQuery.each(
    {
      Height: 'height',
      Width: 'width'
    },
    function (name, type) {
      jQuery.each(
        {
          padding: 'inner' + name,
          content: type,
          '': 'outer' + name
        },
        function (defaultExtra, funcName) {
          jQuery.fn[funcName] = function (margin, value) {
            var chainable =
                arguments.length &&
                (defaultExtra || typeof margin !== 'boolean'),
              extra =
                defaultExtra ||
                (margin === true || value === true ? 'margin' : 'border')
            return access(
              this,
              function (elem, type, value) {
                var doc
                if (jQuery.isWindow(elem)) {
                  return elem.document.documentElement['client' + name]
                }
                if (elem.nodeType === 9) {
                  doc = elem.documentElement
                  return Math.max(
                    elem.body['scroll' + name],
                    doc['scroll' + name],
                    elem.body['offset' + name],
                    doc['offset' + name],
                    doc['client' + name]
                  )
                }
                return value === undefined
                  ? jQuery.css(elem, type, extra)
                  : jQuery.style(elem, type, value, extra)
              },
              type,
              chainable ? margin : undefined,
              chainable,
              null
            )
          }
        }
      )
    }
  )
  jQuery.fn.size = function () {
    return this.length
  }
  jQuery.fn.andSelf = jQuery.fn.addBack
  if (typeof define === 'function' && define.amd) {
    define('jquery', [], function () {
      return jQuery
    })
  }
  var _jQuery = window.jQuery,
    _$ = window.$
  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery
    }
    return jQuery
  }
  if (typeof noGlobal === strundefined) {
    window.jQuery = window.$ = jQuery
  }
  return jQuery
})
/*!
 * jQuery Mobile Events
 * by Ben Major (www.ben-major.co.uk)
 *
 * Copyright 2011, Ben Major
 * Licensed under the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
;(function (h) {
  h.attrFn = h.attrFn || {}
  var b = navigator.userAgent.toLowerCase(),
    e =
      b.indexOf('chrome') > -1 &&
      (b.indexOf('windows') > -1 ||
        b.indexOf('macintosh') > -1 ||
        b.indexOf('linux') > -1) &&
      b.indexOf('mobile') < 0 &&
      b.indexOf('android') < 0,
    r = {
      tap_pixel_range: 5,
      swipe_h_threshold: 50,
      swipe_v_threshold: 50,
      taphold_threshold: 750,
      doubletap_int: 500,
      touch_capable: window.navigator.msPointerEnabled
        ? false
        : 'ontouchstart' in window && !e,
      orientation_support:
        'orientation' in window && 'onorientationchange' in window,
      startevent: window.navigator.msPointerEnabled
        ? 'MSPointerDown'
        : 'ontouchstart' in window && !e
        ? 'touchstart'
        : 'mousedown',
      endevent: window.navigator.msPointerEnabled
        ? 'MSPointerUp'
        : 'ontouchstart' in window && !e
        ? 'touchend'
        : 'mouseup',
      moveevent: window.navigator.msPointerEnabled
        ? 'MSPointerMove'
        : 'ontouchstart' in window && !e
        ? 'touchmove'
        : 'mousemove',
      tapevent: 'ontouchstart' in window && !e ? 'tap' : 'click',
      scrollevent: 'ontouchstart' in window && !e ? 'touchmove' : 'scroll',
      hold_timer: null,
      tap_timer: null
    }
  h.isTouchCapable = function () {
    return r.touch_capable
  }
  h.getStartEvent = function () {
    return r.startevent
  }
  h.getEndEvent = function () {
    return r.endevent
  }
  h.getMoveEvent = function () {
    return r.moveevent
  }
  h.getTapEvent = function () {
    return r.tapevent
  }
  h.getScrollEvent = function () {
    return r.scrollevent
  }
  h.each(
    [
      'tapstart',
      'tapend',
      'tapmove',
      'tap',
      'tap2',
      'tap3',
      'tap4',
      'singletap',
      'doubletap',
      'taphold',
      'swipe',
      'swipeup',
      'swiperight',
      'swipedown',
      'swipeleft',
      'swipeend',
      'scrollstart',
      'scrollend',
      'orientationchange'
    ],
    function (x, w) {
      h.fn[w] = function (y) {
        return y ? this.on(w, y) : this.trigger(w)
      }
      h.attrFn[w] = true
    }
  )
  h.event.special.tapstart = {
    setup: function () {
      var w = this,
        x = h(w)
      x.on(r.startevent, function (A) {
        x.data('callee', arguments.callee)
        if (A.which && A.which !== 1) {
          return false
        }
        var y = A.originalEvent,
          z = {
            position: {
              x: r.touch_capable ? y.touches[0].screenX : A.screenX,
              y: r.touch_capable ? y.touches[0].screenY : A.screenY
            },
            offset: {
              x: r.touch_capable
                ? y.touches[0].pageX - y.touches[0].target.offsetLeft
                : A.offsetX,
              y: r.touch_capable
                ? y.touches[0].pageY - y.touches[0].target.offsetTop
                : A.offsetY
            },
            time: Date.now(),
            target: A.target
          }
        l(w, 'tapstart', A, z)
        return true
      })
    },
    remove: function () {
      h(this).off(r.startevent, h(this).data.callee)
    }
  }
  h.event.special.tapmove = {
    setup: function () {
      var w = this,
        x = h(w)
      x.on(r.moveevent, function (A) {
        x.data('callee', arguments.callee)
        var y = A.originalEvent,
          z = {
            position: {
              x: r.touch_capable ? y.touches[0].screenX : A.screenX,
              y: r.touch_capable ? y.touches[0].screenY : A.screenY
            },
            offset: {
              x: r.touch_capable
                ? y.touches[0].pageX - y.touches[0].target.offsetLeft
                : A.offsetX,
              y: r.touch_capable
                ? y.touches[0].pageY - y.touches[0].target.offsetTop
                : A.offsetY
            },
            time: Date.now(),
            target: A.target
          }
        l(w, 'tapmove', A, z)
        return true
      })
    },
    remove: function () {
      h(this).off(r.moveevent, h(this).data.callee)
    }
  }
  h.event.special.tapend = {
    setup: function () {
      var w = this,
        x = h(w)
      x.on(r.endevent, function (A) {
        x.data('callee', arguments.callee)
        var y = A.originalEvent
        var z = {
          position: {
            x: r.touch_capable ? y.changedTouches[0].screenX : A.screenX,
            y: r.touch_capable ? y.changedTouches[0].screenY : A.screenY
          },
          offset: {
            x: r.touch_capable
              ? y.changedTouches[0].pageX -
                y.changedTouches[0].target.offsetLeft
              : A.offsetX,
            y: r.touch_capable
              ? y.changedTouches[0].pageY - y.changedTouches[0].target.offsetTop
              : A.offsetY
          },
          time: Date.now(),
          target: A.target
        }
        l(w, 'tapend', A, z)
        return true
      })
    },
    remove: function () {
      h(this).off(r.endevent, h(this).data.callee)
    }
  }
  h.event.special.taphold = {
    setup: function () {
      var y = this,
        A = h(y),
        z,
        C,
        x = {
          x: 0,
          y: 0
        },
        w = 0,
        B = 0
      A.on(r.startevent, function (H) {
        if (H.which && H.which !== 1) {
          return false
        } else {
          A.data('tapheld', false)
          z = H.target
          var E = H.originalEvent
          var G = Date.now(),
            F = {
              x: r.touch_capable ? E.touches[0].screenX : H.screenX,
              y: r.touch_capable ? E.touches[0].screenY : H.screenY
            },
            D = {
              x: r.touch_capable
                ? E.touches[0].pageX - E.touches[0].target.offsetLeft
                : H.offsetX,
              y: r.touch_capable
                ? E.touches[0].pageY - E.touches[0].target.offsetTop
                : H.offsetY
            }
          x.x = H.originalEvent.targetTouches
            ? H.originalEvent.targetTouches[0].pageX
            : H.pageX
          x.y = H.originalEvent.targetTouches
            ? H.originalEvent.targetTouches[0].pageY
            : H.pageY
          w = x.x
          B = x.y
          r.hold_timer = window.setTimeout(function () {
            var O = x.x - w,
              N = x.y - B
            if (
              H.target == z &&
              ((x.x == w && x.y == B) ||
                (O >= -r.tap_pixel_range &&
                  O <= r.tap_pixel_range &&
                  N >= -r.tap_pixel_range &&
                  N <= r.tap_pixel_range))
            ) {
              A.data('tapheld', true)
              var K = Date.now(),
                L = {
                  x: r.touch_capable ? E.touches[0].screenX : H.screenX,
                  y: r.touch_capable ? E.touches[0].screenY : H.screenY
                },
                I = {
                  x: r.touch_capable
                    ? E.touches[0].pageX - E.touches[0].target.offsetLeft
                    : H.offsetX,
                  y: r.touch_capable
                    ? E.touches[0].pageY - E.touches[0].target.offsetTop
                    : H.offsetY
                }
              duration = K - G
              var J = {
                startTime: G,
                endTime: K,
                startPosition: F,
                startOffset: D,
                endPosition: L,
                endOffset: I,
                duration: duration,
                target: H.target
              }
              A.data('callee1', arguments.callee)
              l(y, 'taphold', H, J)
            }
          }, r.taphold_threshold)
          return true
        }
      })
        .on(r.endevent, function () {
          A.data('callee2', arguments.callee)
          A.data('tapheld', false)
          window.clearTimeout(r.hold_timer)
        })
        .on(r.moveevent, function (D) {
          A.data('callee3', arguments.callee)
          w = D.originalEvent.targetTouches
            ? D.originalEvent.targetTouches[0].pageX
            : D.pageX
          B = D.originalEvent.targetTouches
            ? D.originalEvent.targetTouches[0].pageY
            : D.pageY
        })
    },
    remove: function () {
      h(this)
        .off(r.startevent, h(this).data.callee1)
        .off(r.endevent, h(this).data.callee2)
        .off(r.moveevent, h(this).data.callee3)
    }
  }
  h.event.special.doubletap = {
    setup: function () {
      var z = this,
        D = h(z),
        B,
        C,
        y,
        x,
        A,
        w = false
      D.on(r.startevent, function (E) {
        if (E.which && E.which !== 1) {
          return false
        }
        D.data('doubletapped', false)
        B = E.target
        D.data('callee1', arguments.callee)
        x = E.originalEvent
        y = {
          position: {
            x: r.touch_capable ? x.touches[0].screenX : E.screenX,
            y: r.touch_capable ? x.touches[0].screenY : E.screenY
          },
          offset: {
            x: r.touch_capable
              ? x.touches[0].pageX - x.touches[0].target.offsetLeft
              : E.offsetX,
            y: r.touch_capable
              ? x.touches[0].pageY - x.touches[0].target.offsetTop
              : E.offsetY
          },
          time: Date.now(),
          target: E.target
        }
        return true
      }).on(r.endevent, function (H) {
        var E = Date.now()
        var G = D.data('lastTouch') || E + 1
        var J = E - G
        window.clearTimeout(C)
        D.data('callee2', arguments.callee)
        if (J < r.doubletap_int && H.target == B && J > 100) {
          D.data('doubletapped', true)
          window.clearTimeout(r.tap_timer)
          var I = {
            position: {
              x: r.touch_capable
                ? H.originalEvent.changedTouches[0].screenX
                : H.screenX,
              y: r.touch_capable
                ? H.originalEvent.changedTouches[0].screenY
                : H.screenY
            },
            offset: {
              x: r.touch_capable
                ? H.originalEvent.changedTouches[0].pageX -
                  H.originalEvent.changedTouches[0].target.offsetLeft
                : H.offsetX,
              y: r.touch_capable
                ? H.originalEvent.changedTouches[0].pageY -
                  H.originalEvent.changedTouches[0].target.offsetTop
                : H.offsetY
            },
            time: Date.now(),
            target: H.target
          }
          var F = {
            firstTap: y,
            secondTap: I,
            interval: I.time - y.time
          }
          if (!w) {
            l(z, 'doubletap', H, F)
          }
          w = true
          A = window.setTimeout(function (K) {
            w = false
          }, r.doubletap_int)
        } else {
          D.data('lastTouch', E)
          C = window.setTimeout(
            function (K) {
              window.clearTimeout(C)
            },
            r.doubletap_int,
            [H]
          )
        }
        D.data('lastTouch', E)
      })
    },
    remove: function () {
      h(this)
        .off(r.startevent, h(this).data.callee1)
        .off(r.endevent, h(this).data.callee2)
    }
  }
  h.event.special.singletap = {
    setup: function () {
      var x = this,
        A = h(x),
        z = null,
        y = null,
        w = {
          x: 0,
          y: 0
        }
      A.on(r.startevent, function (B) {
        if (B.which && B.which !== 1) {
          return false
        } else {
          y = Date.now()
          z = B.target
          A.data('callee1', arguments.callee)
          w.x = B.originalEvent.targetTouches
            ? B.originalEvent.targetTouches[0].pageX
            : B.pageX
          w.y = B.originalEvent.targetTouches
            ? B.originalEvent.targetTouches[0].pageY
            : B.pageY
          return true
        }
      }).on(r.endevent, function (B) {
        A.data('callee2', arguments.callee)
        if (B.target == z) {
          end_pos_x = B.originalEvent.changedTouches
            ? B.originalEvent.changedTouches[0].pageX
            : B.pageX
          end_pos_y = B.originalEvent.changedTouches
            ? B.originalEvent.changedTouches[0].pageY
            : B.pageY
          r.tap_timer = window.setTimeout(function () {
            if (
              !A.data('doubletapped') &&
              !A.data('tapheld') &&
              w.x == end_pos_x &&
              w.y == end_pos_y
            ) {
              var C = B.originalEvent
              var D = {
                position: {
                  x: r.touch_capable ? C.changedTouches[0].screenX : B.screenX,
                  y: r.touch_capable ? C.changedTouches[0].screenY : B.screenY
                },
                offset: {
                  x: r.touch_capable
                    ? C.changedTouches[0].pageX -
                      C.changedTouches[0].target.offsetLeft
                    : B.offsetX,
                  y: r.touch_capable
                    ? C.changedTouches[0].pageY -
                      C.changedTouches[0].target.offsetTop
                    : B.offsetY
                },
                time: Date.now(),
                target: B.target
              }
              if (D.time - y < r.taphold_threshold) {
                l(x, 'singletap', B, D)
              }
            }
          }, r.doubletap_int)
        }
      })
    },
    remove: function () {
      h(this)
        .off(r.startevent, h(this).data.callee1)
        .off(r.endevent, h(this).data.callee2)
    }
  }
  h.event.special.tap = {
    setup: function () {
      var y = this,
        C = h(y),
        x = false,
        A = null,
        z,
        w = {
          x: 0,
          y: 0
        },
        B
      C.on(r.startevent, function (D) {
        C.data('callee1', arguments.callee)
        if (D.which && D.which !== 1) {
          return false
        } else {
          x = true
          w.x = D.originalEvent.targetTouches
            ? D.originalEvent.targetTouches[0].pageX
            : D.pageX
          w.y = D.originalEvent.targetTouches
            ? D.originalEvent.targetTouches[0].pageY
            : D.pageY
          z = Date.now()
          A = D.target
          B = D.originalEvent.targetTouches
            ? D.originalEvent.targetTouches
            : [D]
          return true
        }
      }).on(r.endevent, function (G) {
        C.data('callee2', arguments.callee)
        var N = G.originalEvent.targetTouches
            ? G.originalEvent.changedTouches[0].pageX
            : G.pageX,
          L = G.originalEvent.targetTouches
            ? G.originalEvent.changedTouches[0].pageY
            : G.pageY,
          I = w.x - N,
          H = w.y - L,
          F
        if (
          A == G.target &&
          x &&
          Date.now() - z < r.taphold_threshold &&
          ((w.x == N && w.y == L) ||
            (I >= -r.tap_pixel_range &&
              I <= r.tap_pixel_range &&
              H >= -r.tap_pixel_range &&
              H <= r.tap_pixel_range))
        ) {
          var J = G.originalEvent
          var K = []
          for (var E = 0; E < B.length; E++) {
            var D = {
              position: {
                x: r.touch_capable ? J.changedTouches[E].screenX : G.screenX,
                y: r.touch_capable ? J.changedTouches[E].screenY : G.screenY
              },
              offset: {
                x: r.touch_capable
                  ? J.changedTouches[E].pageX -
                    J.changedTouches[E].target.offsetLeft
                  : G.offsetX,
                y: r.touch_capable
                  ? J.changedTouches[E].pageY -
                    J.changedTouches[E].target.offsetTop
                  : G.offsetY
              },
              time: Date.now(),
              target: G.target
            }
            K.push(D)
          }
          switch (B.length) {
            case 1:
              F = 'tap'
              break
            case 2:
              F = 'tap2'
              break
            case 3:
              F = 'tap3'
              break
            case 4:
              F = 'tap4'
              break
          }
          l(y, F, G, K)
        }
      })
    },
    remove: function () {
      h(this)
        .off(r.startevent, h(this).data.callee1)
        .off(r.endevent, h(this).data.callee2)
    }
  }
  h.event.special.swipe = {
    setup: function () {
      var z = this,
        B = h(z),
        A = false,
        x = false,
        y = {
          x: 0,
          y: 0
        },
        D = {
          x: 0,
          y: 0
        },
        F

      function w (H) {
        B = h(H.currentTarget)
        B.data('callee1', arguments.callee)
        y.x = H.originalEvent.targetTouches
          ? H.originalEvent.targetTouches[0].pageX
          : H.pageX
        y.y = H.originalEvent.targetTouches
          ? H.originalEvent.targetTouches[0].pageY
          : H.pageY
        D.x = y.x
        D.y = y.y
        A = true
        var G = H.originalEvent
        F = {
          position: {
            x: r.touch_capable ? G.touches[0].screenX : H.screenX,
            y: r.touch_capable ? G.touches[0].screenY : H.screenY
          },
          offset: {
            x: r.touch_capable
              ? G.touches[0].pageX - G.touches[0].target.offsetLeft
              : H.offsetX,
            y: r.touch_capable
              ? G.touches[0].pageY - G.touches[0].target.offsetTop
              : H.offsetY
          },
          time: Date.now(),
          target: H.target
        }
      }

      function C (L) {
        B = h(L.currentTarget)
        B.data('callee2', arguments.callee)
        D.x = L.originalEvent.targetTouches
          ? L.originalEvent.targetTouches[0].pageX
          : L.pageX
        D.y = L.originalEvent.targetTouches
          ? L.originalEvent.targetTouches[0].pageY
          : L.pageY
        var H
        var O = B.parent().data('xthreshold')
            ? B.parent().data('xthreshold')
            : B.data('xthreshold'),
          K = B.parent().data('ythreshold')
            ? B.parent().data('ythreshold')
            : B.data('ythreshold'),
          I =
            typeof O !== 'undefined' && O !== false && parseInt(O)
              ? parseInt(O)
              : r.swipe_h_threshold,
          J =
            typeof K !== 'undefined' && K !== false && parseInt(K)
              ? parseInt(K)
              : r.swipe_v_threshold
        if (y.y > D.y && y.y - D.y > J) {
          H = 'swipeup'
        }
        if (y.x < D.x && D.x - y.x > I) {
          H = 'swiperight'
        }
        if (y.y < D.y && D.y - y.y > J) {
          H = 'swipedown'
        }
        if (y.x > D.x && y.x - D.x > I) {
          H = 'swipeleft'
        }
        if (H != undefined && A) {
          y.x = 0
          y.y = 0
          D.x = 0
          D.y = 0
          A = false
          var P = L.originalEvent
          endEvnt = {
            position: {
              x: r.touch_capable ? P.touches[0].screenX : L.screenX,
              y: r.touch_capable ? P.touches[0].screenY : L.screenY
            },
            offset: {
              x: r.touch_capable
                ? P.touches[0].pageX - P.touches[0].target.offsetLeft
                : L.offsetX,
              y: r.touch_capable
                ? P.touches[0].pageY - P.touches[0].target.offsetTop
                : L.offsetY
            },
            time: Date.now(),
            target: L.target
          }
          var N = Math.abs(F.position.x - endEvnt.position.x),
            G = Math.abs(F.position.y - endEvnt.position.y)
          var Q = {
            startEvnt: F,
            endEvnt: endEvnt,
            direction: H.replace('swipe', ''),
            xAmount: N,
            yAmount: G,
            duration: endEvnt.time - F.time
          }
          x = true
          B.trigger('swipe', Q).trigger(H, Q)
        }
      }

      function E (L) {
        B = h(L.currentTarget)
        var H = ''
        B.data('callee3', arguments.callee)
        if (x) {
          var O = B.data('xthreshold'),
            K = B.data('ythreshold'),
            I =
              typeof O !== 'undefined' && O !== false && parseInt(O)
                ? parseInt(O)
                : r.swipe_h_threshold,
            J =
              typeof K !== 'undefined' && K !== false && parseInt(K)
                ? parseInt(K)
                : r.swipe_v_threshold
          var P = L.originalEvent
          endEvnt = {
            position: {
              x: r.touch_capable ? P.changedTouches[0].screenX : L.screenX,
              y: r.touch_capable ? P.changedTouches[0].screenY : L.screenY
            },
            offset: {
              x: r.touch_capable
                ? P.changedTouches[0].pageX -
                  P.changedTouches[0].target.offsetLeft
                : L.offsetX,
              y: r.touch_capable
                ? P.changedTouches[0].pageY -
                  P.changedTouches[0].target.offsetTop
                : L.offsetY
            },
            time: Date.now(),
            target: L.target
          }
          if (
            F.position.y > endEvnt.position.y &&
            F.position.y - endEvnt.position.y > J
          ) {
            H = 'swipeup'
          }
          if (
            F.position.x < endEvnt.position.x &&
            endEvnt.position.x - F.position.x > I
          ) {
            H = 'swiperight'
          }
          if (
            F.position.y < endEvnt.position.y &&
            endEvnt.position.y - F.position.y > J
          ) {
            H = 'swipedown'
          }
          if (
            F.position.x > endEvnt.position.x &&
            F.position.x - endEvnt.position.x > I
          ) {
            H = 'swipeleft'
          }
          var N = Math.abs(F.position.x - endEvnt.position.x),
            G = Math.abs(F.position.y - endEvnt.position.y)
          var Q = {
            startEvnt: F,
            endEvnt: endEvnt,
            direction: H.replace('swipe', ''),
            xAmount: N,
            yAmount: G,
            duration: endEvnt.time - F.time
          }
          B.trigger('swipeend', Q)
        }
        A = false
        x = false
      }
      B.on(r.startevent, w)
      B.on(r.moveevent, C)
      B.on(r.endevent, E)
    },
    remove: function () {
      h(this)
        .off(r.startevent, h(this).data.callee1)
        .off(r.moveevent, h(this).data.callee2)
        .off(r.endevent, h(this).data.callee3)
    }
  }
  h.event.special.scrollstart = {
    setup: function () {
      var w = this,
        z = h(w),
        y,
        A

      function x (B, C) {
        y = C
        l(w, y ? 'scrollstart' : 'scrollend', B)
      }
      z.on(r.scrollevent, function (B) {
        z.data('callee', arguments.callee)
        if (!y) {
          x(B, true)
        }
        clearTimeout(A)
        A = setTimeout(function () {
          x(B, false)
        }, 50)
      })
    },
    remove: function () {
      h(this).off(r.scrollevent, h(this).data.callee)
    }
  }
  var g = h(window),
    t,
    s,
    p,
    a,
    u,
    d = {
      '0': true,
      '180': true
    }
  if (r.orientation_support) {
    var v = window.innerWidth || g.width(),
      j = window.innerHeight || g.height(),
      f = 50
    a = v > j && v - j > f
    u = d[window.orientation]
    if ((a && u) || (!a && !u)) {
      d = {
        '-90': true,
        '90': true
      }
    }
  }
  h.event.special.orientationchange = t = {
    setup: function () {
      if (r.orientation_support) {
        return false
      }
      p = s()
      g.on('throttledresize', c)
      return true
    },
    teardown: function () {
      if (r.orientation_support) {
        return false
      }
      g.off('throttledresize', c)
      return true
    },
    add: function (w) {
      var x = w.handler
      w.handler = function (y) {
        y.orientation = s()
        return x.apply(this, arguments)
      }
    }
  }

  function c () {
    var w = s()
    if (w !== p) {
      p = w
      g.trigger('orientationchange')
    }
  }
  h.event.special.orientationchange.orientation = s = function () {
    var x = true,
      w = document.documentElement
    if (r.orientation_support) {
      x = d[window.orientation]
    } else {
      x = w && w.clientWidth / w.clientHeight < 1.1
    }
    return x ? 'portrait' : 'landscape'
  }
  h.event.special.throttledresize = {
    setup: function () {
      h(this).on('resize', k)
    },
    teardown: function () {
      h(this).off('resize', k)
    }
  }
  var i = 250,
    k = function () {
      q = Date.now()
      o = q - n
      if (o >= i) {
        n = q
        h(this).trigger('throttledresize')
      } else {
        if (m) {
          window.clearTimeout(m)
        }
        m = window.setTimeout(c, i - o)
      }
    },
    n = 0,
    m,
    q,
    o

  function l (A, x, z, w) {
    var y = z.type
    z.type = x
    h.event.dispatch.call(A, z, w)
    z.type = y
  }
  h.each(
    {
      scrollend: 'scrollstart',
      swipeup: 'swipe',
      swiperight: 'swipe',
      swipedown: 'swipe',
      swipeleft: 'swipe',
      swipeend: 'swipe',
      tap2: 'tap'
    },
    function (x, y, w) {
      h.event.special[x] = {
        setup: function () {
          h(this).on(y, h.noop)
        }
      }
    }
  )
})(jQuery)
;(function (d, m) {
  if (d.M && d.M.Module) {
    return
  }
  var i = (d.M = {})
  var y = true,
    af = false,
    Y = 0,
    D = 0,
    F = 1,
    V = 2,
    H = String.prototype,
    p = Array.prototype,
    h = Object.prototype,
    n = Function.prototype,
    j = H.trim,
    O = p.map,
    ac = p.some,
    ak = p.every,
    P = p.slice,
    k = p.filter,
    u = p.forEach,
    X = p.indexOf,
    R = p.lastIndexOf,
    B = n.bind
  i.log = function () {
    if ('console' in d && typeof d.console.log == 'function') {
      return d.console.log.apply(d.console, arguments)
    }
  }
  i.info = function () {
    if ('console' in d) {
      if (typeof d.console.info == 'function') {
        return d.console.info.apply(d.console, arguments)
      } else {
        if (typeof d.console.log == 'function') {
          return d.console.log.apply(d.console, arguments)
        }
      }
    }
  }
  i.debug = function () {
    if (i.config.debug) {
      return i.log.apply(i, arguments)
    }
  }
  i.warning = function (al) {
    if (i.config.debug) {
      i.info('Error:' + al)
    }
  }
  i.error = function (al) {
    if (i.config.debug) {
      throw new TypeError(al)
    } else {
      i.info('Error:' + al)
    }
  }
  var ae = function () {},
    K = function () {
      Y++
      return Y
    },
    z = function (am, al) {
      al = al.substr(0, 1).toUpperCase() + al.substr(1)
      return {}.toString.call(am) == '[object ' + al + ']'
    },
    aa = function (al) {
      return al === null
    },
    t = function (al) {
      return al === m
    },
    w = function (al) {
      return z(al, 'Array')
    },
    U = function (al) {
      return typeof al == 'object' && !aa(al)
    },
    q = function (al) {
      return typeof al === 'function'
    },
    J = function (am) {
      if (!U(am)) {
        return af
      }
      for (var al in am) {
        if (am.hasOwnProperty(al)) {
          return af
        }
      }
      return y
    },
    s = function (al) {
      return al === '' || (w(al) && al.length === 0) || J(al)
    },
    A = function (an) {
      var am = []
      if (U(an)) {
        for (var al in an) {
          if (an.hasOwnProperty(al)) {
            am.push(al)
          }
        }
      }
      return am
    },
    a = function (al) {
      if (j) {
        return j.call(al)
      } else {
        return al.replace(/^\s+|\s+$/g, '')
      }
    },
    C = function (an, aq, ao) {
      if (O) {
        return O.call(an, aq, ao)
      } else {
        if (aa(an) || t(an)) {
          i.error('Array.prototype.map called on null or undefined')
        } else {
          if (!q(aq)) {
            i.error(aq + ' is not a function')
          }
        }
        var ar = Object(an),
          am = ar.length >>> 0,
          al = new Array(am),
          ap = 0
        while (ap < am) {
          if (ap in ar) {
            al[ap] = aq.call(ao, ar[ap], ap, ar)
          }
          ap++
        }
        return al
      }
    },
    T = function (an, aq, ao) {
      if (ac) {
        return ac.call(an, aq, ao)
      } else {
        if (aa(an) || t(an)) {
          i.error('Array.prototype.some called on null or undefined')
        } else {
          if (!q(aq)) {
            i.error(aq + ' is not a function')
          }
        }
        var ar = Object(an),
          am = ar.length >>> 0,
          al = new Array(am),
          ap = 0
        while (ap < am) {
          if (ap in ar && aq.call(ao, ar[ap], ap, ar)) {
            return y
          }
          ap++
        }
        return af
      }
    },
    G = function (an, aq, ao) {
      if (ak) {
        return ak.call(an, aq, ao)
      } else {
        if (aa(an) || t(an)) {
          i.error('Array.prototype.every called on null or undefined')
        } else {
          if (!q(aq)) {
            i.error(aq + ' is not a function')
          }
        }
        var ar = Object(an),
          am = ar.length >>> 0,
          al = new Array(am),
          ap = 0
        while (ap < am) {
          if (ap in ar && !aq.call(ao, ar[ap], ap, ar)) {
            return af
          }
          ap++
        }
        return y
      }
    },
    I = function (am, ar, an) {
      if (k) {
        return k.call(am, ar, an)
      } else {
        if (aa(am) || t(am)) {
          i.error('Array.prototype.filter called on null or undefined')
        } else {
          if (!q(ar)) {
            i.error(ar + ' is not a function')
          }
        }
        var at = Object(am),
          al = at.length >>> 0,
          ao = 0,
          ap = [],
          aq
        while (ao < al) {
          if (ao in at) {
            aq = at[ao]
            if (ar.call(an, aq, ao, at)) {
              ap.push(aq)
            }
          }
          ao++
        }
        return ap
      }
    },
    r = function (am, an) {
      if (X) {
        var ao = P.call(arguments, 1)
        return X.apply(am, ao)
      } else {
        var al = am.length,
          ap = 0
        if (arguments.length > 2) {
          ap = parseInt(arguments[2], 10)
          ap = isNaN(ap) ? 0 : ap
        }
        if (al === 0 || ap > al) {
          return -1
        }
        if (ap < 0) {
          ap += al
        }
        for (; ap < al; ap++) {
          if (am[ap] === an) {
            return ap
          }
        }
        return -1
      }
    },
    L = function (am, an) {
      if (R) {
        var ao = P.call(arguments, 1)
        return R.apply(am, ao)
      } else {
        var al = am.length,
          ap = al
        if (al === 0) {
          return -1
        }
        if (arguments.length > 2) {
          ap = parseInt(arguments[2], 10)
          ap = isNaN(ap) ? al : ap
        }
        if (ap < 0) {
          ap += al
        }
        for (; ap >= 0; ap--) {
          if (am[ap] === an) {
            return ap
          }
        }
        return -1
      }
    },
    f = function (am, al) {
      if (B) {
        var aq = P.call(arguments, 2)
        return B.apply(am, [al].concat(aq))
      } else {
        if (!q(am)) {
          i.error(
            'Function.prototype.bind - what is trying to be bound is not callable'
          )
        }
        var aq = P.call(arguments, 2),
          ap = am,
          an = function () {},
          ao = function () {
            return ap.apply(
              am instanceof an && al ? am : al || d,
              aq.concat(P.call(arguments, 0))
            )
          }
        an.prototype = am.prototype
        ao.prototype = new an()
        return ao
      }
    },
    ab = function (ao) {
      var al = P.call(arguments, 1),
        am = arguments.length,
        an = y
      if (z(al[am - 2], 'Boolean')) {
        an = al[am - 2]
        al = al.slice(0, am - 2)
      }
      c(al, function (ar, ap) {
        if (U(ar)) {
          for (var aq in ar) {
            if (!ao.hasOwnProperty(aq) || an) {
              ao[aq] = ar[aq]
            }
          }
        }
      })
      return ao
    },
    l = function (an, am) {
      var ao = function () {}
      ao.prototype = am.prototype
      var al = an.prototype
      an.prototype = new ao()
      ab(an.prototype, al, y)
      an.prototype.constructor = an
      an.prototype.$parent = am.prototype
      an.$parent = am
      return an
    },
    c = function (ap, ao, an) {
      var am, al
      an = an || d
      if (!U(ap)) {
        return
      }
      if (u && (z(ap, 'Array') || z(ap, 'Arguments'))) {
        var aq = P.call(ap, 0)
        u.call(aq, ao, an)
      } else {
        if (z(ap, 'Array') || z(ap, 'Arguments')) {
          var aq = P.call(ap, 0)
          for (am = 0, al = aq.length; am < al; am++) {
            ao.call(an, aq[am], am, aq)
          }
        } else {
          for (am in ap) {
            if (ap.hasOwnProperty(am)) {
              ao.call(an, ap[am], am, ap)
            }
          }
        }
      }
    }
  ab(i, {
    is: z,
    isNull: aa,
    isUndefined: t,
    isArray: w,
    isObject: U,
    isFunction: q,
    isEmptyObject: J,
    isEmpty: s,
    keys: A,
    trim: a,
    bind: f,
    mix: ab,
    extend: l,
    map: C,
    some: T,
    every: G,
    filter: I,
    forEach: c,
    indexOf: r,
    lastIndexOf: L
  })
  var x = {},
    ag = function (al, an) {
      var am = []
      if (al.length > 1) {
        am = P.call(al).slice(1)
      }
      am.unshift(an + '_' + al[0])
      return am
    },
    o = {},
    e = {
      on: function (al, am) {
        if (!(al in x)) {
          x[al] = []
        }
        x[al].push(am)
      },
      off: function (al, am) {
        if (!(al in x) || x[al].length === 0) {
          return
        }
        if (!am) {
          x[al] = []
        } else {
          c(x[al], function (ao, an) {
            if (ao == am) {
              x[al][an] = null
            }
          })
        }
      },
      once: function (am, an) {
        var ao = this,
          al = function () {
            ao.off(am, al)
            var ap = P.call(arguments)
            an.apply(null, ap)
          }
        return this.on(am, al)
      },
      fire: function (al) {
        o[al] = 1
        if (!(al in x) || x[al].length === 0) {
          return
        }
        var am = []
        if (arguments.length > 0) {
          am = P.call(arguments).slice(1)
        }
        c(x[al], function (ao, an) {
          if (q(ao)) {
            ao.apply(d, am)
          }
        })
      },
      isFired: function (al) {
        if (al in o) {
          return true
        }
        return false
      }
    }
  var W = (i.Event = function (an) {
    if (!U(an) && !q(an)) {
      i.error('only can bind event on object or function:' + an)
    }
    if (!an.__event_id) {
      an.__event_id = K()
    }
    var al = {},
      am = an.__event_id
    c(e, function (ap, ao) {
      al[ao] = function () {
        return ap.apply(e, ag(arguments, 'objectevent_' + am))
      }
    })
    return al
  })
  var ad = {}
  c(e, function (am, al) {
    ad[al] = function () {
      return am.apply(e, ag(arguments, 'normalevent'))
    }
  })
  ab(i.Event, ad)
  i.events = x
  var v = (i.Modules = {})

  function E (al) {
    this.id = ''
    this.depends = []
    this.factory = null
    this.status = F
    this.instantiated = af
    ab(this, al)
    this.instance = this.instantiated ? this.factory : null
  }
  E.prototype = {
    load: function () {
      this.status = V
      W.fire(this.id + ' loaded')
    },
    getInstance: function () {
      if (!this.instantiated) {
        var an = this.id,
          am = {
            exports: {},
            getId: function () {
              return an
            }
          },
          al = this.factory.call(d, b, am.exports, am)
        if (J(am.exports)) {
          am.exports = al
        }
        this.instance = am.exports
        this.instantiated = true
      }
      return this.instance
    }
  }

  function b (al) {
    if (!(al in v) || v[al].status !== V) {
      i.error('can not require an unloaded module:' + al)
    }
    return v[al].getInstance()
  }
  b.async = function (al, am) {
    if (z(al, 'String')) {
      al = al.split(',')
    }
    if (!z(al, 'Array')) {
      i.error('module async require invalid:' + al)
    }
    g(al, function () {
      var an = C(al, function (ao) {
        return b(ao)
      })
      am.apply(d, an)
    })
    i.fetchModules(al)
  }
  var S = (d.define = i.define = function (ap, al) {
    if (!z(ap, 'String')) {
      i.error('module id invalid:' + ap)
    }
    if (!q(al) && !U(al)) {
      i.error('module ' + ap + ' factory invalid')
    }
    if (ap in v) {
      i.warning('module ' + ap + ' has been defined')
      return
    }
    var ao = []
    if (q(al)) {
      ao = aj(al)
    }
    var an = new E({
      id: ap,
      depends: ao,
      factory: al,
      status: ao.length ? F : V,
      instantiated: q(al) ? af : y
    })
    v[ap] = an
    if (an.status === F) {
      var am = y
      c(ao, function (aq) {
        if (!(aq in v) || (v[aq].status !== V && !Z(ap, aq))) {
          W.on(aq + ' loaded', function () {
            ai(an)
          })
          am = af
        }
      })
      if (am) {
        an.load()
      }
    } else {
      an.load()
    }
  })
  var aj = function (ap) {
    var am = a(ap.toString()),
      ao = am.indexOf(')'),
      ar = am.substr(0, ao + 1),
      al = ar.match(/\(\s*([^\)]*)\s*\)/)
    if (!aa(al)) {
      var av = a(al[1])
      if (av.length > 0) {
        var aq = av.split(','),
          au = a(aq[0]),
          aw = new RegExp(
            '\\b' + au + '\\s*\\(\\s*[\'"]([^\\)]+)[\'"]\\s*\\)',
            'g'
          )
        var at,
          an = []
        while ((at = aw.exec(am)) !== null) {
          an.push(a(at[1]))
        }
        return an
      }
    }
    return []
  }
  var Z = function (aq, ao) {
    var al = v[ao],
      am = al.depends,
      ap = am.length
    if (ap === 0) {
      return af
    } else {
      if (r(am, aq) != -1) {
        return y
      } else {
        for (var an = 0; an < ap; an++) {
          if (am[an] in v && Z(aq, am[an])) {
            return y
          }
        }
        return af
      }
    }
  }
  var ai = function (am) {
    var al = y,
      an = am.depends
    c(an, function (ao) {
      if (!(ao in v) || v[ao].status !== V) {
        al = af
      }
    })
    if (al) {
      am.load()
    }
  }
  E.waiting = function () {
    var al = []
    c(v, function (at, ao) {
      if (at.status === F) {
        var ar = {
            id: ao,
            wait: []
          },
          aq,
          an
        for (var ap = 0, am = at.depends.length; ap < am; ap++) {
          aq = at.depends[ap]
          if (aq in v) {
            if (v[aq].status === F) {
              ar.wait.push({
                id: aq,
                status: F
              })
            }
          } else {
            ar.wait.push({
              id: aq,
              status: D
            })
          }
        }
        al.push(ar)
      }
    })
    return al
  }
  E.loaded = function () {
    var al = []
    c(v, function (an, am) {
      if (an.status === V) {
        al.push({
          id: am,
          depends: an.depends
        })
      }
    })
    return al
  }
  i.Module = E
  i.closure = function (an, al) {
    var ao = []
    if (!q(an)) {
      i.error('M.closure is for function execution.')
    }
    var am = aj(an)
    if (J(am)) {
      an(b)
    } else {
      g(am, function () {
        an(b)
      })
    }
    c(am, function (ap) {
      if (!(ap in v)) {
        ao.push(ap)
      }
    })
    if (al && ao.length > 0) {
      i.fetchModules(ao)
    }
  }
  var Q = []
  var g = function (am, ao) {
    if (!q(ao)) {
      return af
    }
    var an = y,
      al = {
        moduleIds: {},
        callback: ao
      }
    c(am, function (ap) {
      if (!(ap in v) || v[ap].status !== V) {
        al.moduleIds[ap] = y
        W.on(ap + ' loaded', function () {
          N(ap)
        })
      }
    })
    if (!J(al.moduleIds)) {
      Q.push(al)
    } else {
      ao()
    }
  }
  var N = function (al) {
    c(Q, function (am, an) {
      if (am) {
        if (al in am.moduleIds) {
          delete am.moduleIds[al]
        }
        if (J(am.moduleIds)) {
          delete Q[an]
          am.callback()
        }
      }
    })
  }
  E.closureWaiting = function () {
    return Q
  }
  E.wait = g
  var ah = []
  i.fetchModules = function (al) {
    var am = []
    c(al, function (an) {
      if (r(ah, an) == -1 && !(an in v)) {
        am.push(an)
        ah.push(an)
      }
    })
    if (am.length > 0) {
      i.config.fetchModules(am)
    }
  }
  i.fetching = function () {
    var al = []
    c(ah, function (am) {
      if (!(am in v)) {
        al.push(am)
      }
    })
    return al
  }
  i.config = {
    debug: af,
    fetchModules: function () {
      i.error('You must implement fetchModules method!')
    }
  }
})(window)
;(function (v) {
  if (!v.M || !v.$) {
    return
  }
  var g = v.M,
    e = v.$
  var b = window.Env || {},
    n = b.WWW_HOST || 'www.mafengwo.cn',
    x = b.JS_HOST || 'js.mafengwo.net',
    z = b.PAGELET_HTTP || location.protocol + '//pagelet.mafengwo.cn'
  g.config.debug = b.debug || false

  function t () {
    g.windowFocused = true
  }

  function d () {
    g.windowFocused = false
  }
  g.windowFocused = true
  if ('addEventListener' in window) {
    window.addEventListener('focus', t, false)
    window.addEventListener('blur', d, false)
  } else {
    if ('attachEvent' in document) {
      document.attachEvent('onfocusin', t)
      document.attachEvent('onfocusout', d)
    }
  }
  g.config.fetchModules = function (D, E) {
    return g.config.fetchJS(D, E)
  }
  g.config.fetchJS = function (D, E) {
    g.loadCSSJS(D, function (F) {
      if ('js_list' in F) {
        g.loadResource(F.js_list, E)
      }
    })
  }
  g.config.fetchCSS = function (D, E) {
    g.loadCSSJS(D, function (F) {
      if ('css_list' in F) {
        g.loadResource(F.css_list, E)
      }
    })
  }
  g.loadCSSJS = function (H, G) {
    if (g.is(H, 'String')) {
      H = [H]
    }
    var D = [],
      E = []
    g.forEach(H, function (I) {
      if (q(I)) {
        D.push(I)
      } else {
        E.push(I)
      }
    })
    if (!D.length && !E.length) {
      typeof G == 'function' && G({})
    } else {
      var F = g.map(g.Module.loaded(), function (I) {
        return I.id
      })
      e.ajax(
        {
          dataType: 'jsonp',
          url: location.protocol + '//' + n + '/ajax/ajax_fetch_cssjs.php',
          data: {
            css_list: D,
            js_list: E,
            loaded_modules: F.join(',')
          },
          success: function (I) {
            typeof G == 'function' && G(I)
          }
        },
        'json'
      )
    }
  }
  var C = v.document,
    f = C.getElementsByTagName('head')[0] || C.documentElement,
    B = +navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, '$1') < 536,
    k = []
  var q = function (D) {
      return D.search(/\.css(\?[^\.\?]*)?$/) !== -1
    },
    u = function (H, E) {
      var G = H.sheet,
        D = false
      if (B && G) {
        D = true
      } else {
        if (G) {
          try {
            if (G.cssRules) {
              D = true
            }
          } catch (F) {
            if (F.name === 'NS_ERROR_DOM_SECURITY_ERR') {
              D = true
            }
          }
        }
      }
      setTimeout(function () {
        if (D) {
          s(E)
        } else {
          u(H, E)
        }
      }, 20)
    },
    l = function (D, F) {
      var E = C.createElement(F ? 'link' : 'script')
      if (F) {
        E.rel = 'stylesheet'
        E.href = D
      } else {
        E.async = true
        E.src = D
        if (
          !b.disable_cors &&
          (D.indexOf('http://' + x) === 0 || D.indexOf('https://' + x) === 0)
        ) {
          E.setAttribute('crossorigin', 'anonymous')
        }
      }
      f.appendChild(E)
      return E
    },
    i = function (D, E) {
      if (!D || (g.is(D, 'Array') && D.length === 0)) {
        if (typeof E == 'function') {
          E()
        }
      } else {
        if (!g.is(D, 'Array')) {
          D = [D]
        }
        if (typeof E == 'function') {
          k.push({
            urls: D,
            callback: E
          })
        }
        g.forEach(D, function (F) {
          var H = q(F)
          if (j(F, H)) {
            s(F)
            return
          }
          var G = l(F, H),
            I = 'onload' in G
          if (H && (B || !I)) {
            setTimeout(function () {
              u(G, F)
            }, 1)
          } else {
            if (I) {
              G.onload = function () {
                G.onload = null
                s(F)
              }
            } else {
              G.onreadystatechange = function () {
                if (/loaded|complete/.test(G.readyState)) {
                  G.onreadystatechange = null
                  s(F)
                }
              }
            }
          }
        })
      }
    },
    y = function (D, E) {
      if ('css_list' in D) {
        g.loadResource(D.css_list, function () {
          if ('js_list' in D) {
            g.loadResource(D.js_list, E)
          } else {
            if (typeof E == 'function') {
              E()
            }
          }
        })
      } else {
        if ('js_list' in D) {
          g.loadResource(D.js_list, E)
        } else {
          if (typeof E == 'function') {
            E()
          }
        }
      }
    },
    j = function (D, F) {
      var E = false
      if (F) {
        e('link').each(function () {
          var G = this.href
          if (G.length && w(D, G, F)) {
            E = true
            return false
          }
        })
      } else {
        e('script').each(function () {
          var G = this.src
          if (G.length && w(D, G, F)) {
            E = true
            return false
          }
        })
      }
      return E
    },
    w = function (G, F, D) {
      var E = D ? /(\.css)(\?\d*)?$/ : /(\.js)(\?\d*)?$/
      G = G.replace(E, '$1')
      F = F.replace(E, '$1')
      return G === F
    },
    s = function (D) {
      g.forEach(k, function (G, E) {
        if (G) {
          var H = G.urls,
            I = G.callback
          for (var F = 0; F < H.length; F++) {
            if (D == H[F]) {
              H.splice(F, 1)
              F--
            }
          }
          if (!H.length) {
            delete k[E]
            if (typeof I == 'function') {
              I()
            }
          }
        }
      })
    }
  g.loadResource = i
  g.fetchCSSJS = function (E, D) {
    g.loadCSSJS(E, function (F) {
      y(F, D)
    })
  }
  g.loadIMG = function (F, G, E) {
    var D = new Image()
    G = typeof G === 'function' ? G : function () {}
    D.onload = function () {
      D.onload = null
      G.call(null, D)
    }
    if (D.readyState == 'complete') {
      G.call(null, D)
    }
    if (E && typeof E === 'function') {
      D.onerror = E
    }
    D.src = F
  }
  g.loadCssJsListSeq = y
  g.addStyle = function (E) {
    var D = document.createElement('style')
    D.type = 'text/css'
    document.getElementsByTagName('head')[0].appendChild(D)
    if (D.styleSheet) {
      D.styleSheet.cssText = E
    } else {
      D.appendChild(document.createTextNode(E))
    }
  }
  var p = null
  g.cssSupport = function (J) {
    var H = false,
      G,
      D
    J = '' + J
    if (J.length) {
      if (!p) {
        var K = document.createElement('div')
        p = K.style
      }
      var E = J.split('-')
      if (E.length > 1) {
        for (G = 0, D = E.length; G < D; G++) {
          E[G] = E[G].toLowerCase()
          if (G > 0) {
            var I = E[G]
            E[G] = I.charAt(0).toUpperCase() + I.substr(1)
          }
        }
        J = E.join('')
      }
      if (J in p) {
        H = J
      } else {
        var F = 'webkit moz ms o'.split(' ')
        J = J.charAt(0).toUpperCase() + J.substr(1)
        for (G = 0, D = F.length; G < D; G++) {
          if (F[G] + J in p) {
            H = F[G] + J
            break
          }
        }
      }
    }
    return H
  }
  if (b.CSTK) {
    if (typeof e.ajaxSetup == 'function') {
      e.ajaxSetup({
        beforeSend: function (E, D) {
          if (D.data) {
            if (g.isObject(D.data)) {
              if (D.data._need_cstk) {
                D.data = e.extend(D.data, {
                  __ctk__: b.CSTK
                })
              }
            } else {
              if (g.is(D.data, 'String')) {
                if (D.data.indexOf('_need_cstk') != -1) {
                  D.data =
                    D.data +
                    '&' +
                    e.param({
                      __ctk__: b.CSTK
                    })
                }
              }
            }
          }
          return true
        }
      })
    }
  }
  g.Utils = {}
  g.loadAppRaw = function (E, D, H, I) {
    var G = g.map(g.Module.loaded(), function (J) {
      return J.id
    })
    var F = {
      app: E,
      loaded_modules: G.join(','),
      params: JSON.stringify(H)
    }
    if (D) {
      F.app_conf = D
    }
    e.ajax(
      {
        dataType: 'jsonp',
        url: location.protocol + '//' + n + '/ajax/ajax_japp.php',
        data: F,
        success: function (J) {
          typeof I == 'function' && I(J)
        }
      },
      'json'
    )
  }
  g.loadApp = function (E, D, F, G) {
    g.loadAppRaw(E, D, F, function (H) {
      if (!g.isEmpty(H)) {
        var I = {
          css_list: H.css || [],
          js_list: H.js || []
        }
        y(I, function () {
          if (typeof G == 'function') {
            G(H)
          }
        })
      }
    })
  }
  g.JAppController = {
    loadedList: {},
    isLoaded: function (E, D) {
      return (D ? D + ':' + E : E) in this.loadedList
    },
    getJApp: function (E, D) {
      return D ? this.loadedList[D + ':' + E] : this.loadedList[E]
    },
    onload: function (E, D, F) {
      E = D ? D + ':' + E : E
      g.Event.on(
        'app ' + E + ' loaded',
        g.bind(function () {
          F.call(v, this.loadedList[E])
        }, this)
      )
    }
  }
  g.JApp = function (D, E) {
    if (!g.JAppController.isLoaded(D)) {
      if (!g.is(D, 'String')) {
        g.error('app can not be defined without name')
      }
      if (!E || (typeof E != 'function' && typeof E.run != 'function')) {
        g.error('invalid app:' + D)
      }
      if (typeof E == 'function') {
        E = {
          run: E
        }
      }
      g.JAppController.loadedList[D] = E
      g.Event.fire('app ' + D + ' loaded')
    }
  }
  g.loadJApp = function (E, F, D, G) {
    F = e(F)
    if (!g.JAppController.isLoaded(E, D)) {
      if (!F.data('locking')) {
        F.data('locking', true)
        F.css('cursor', 'wait')
        g.JAppController.onload(E, D, function (H) {
          F.data('locking', false)
          F.css('cursor', '')
          H.run(F)
        })
        g.loadAppRaw(E, D, G, function (H) {
          if (!g.isEmpty(H)) {
            g.loadResource(H.css, function () {
              if (H.html) {
                e('body').append(H.html)
                g.Event.fire('new html appended')
              }
              if (H.js && H.js.length) {
                g.loadResource(H.js)
              }
            })
          }
        })
      }
    } else {
      g.JAppController.getJApp(E, D).run(F)
    }
  }
  var c = ['activity_share', 'sns_share']
  e(document).on('click', '[data-japp]', function (D) {
    var E = e(D.currentTarget)
    if (
      (E.get(0).tagName.toLowerCase() == 'a' && E.attr('href') == '#') ||
      E.hasClass('_j_pvd')
    ) {
      D.preventDefault()
    }
    A(E)
  })
  if ('ontouchstart' in document.documentElement) {
    if (e.event && e.event.special && 'tap' in e.event.special) {
      e(document).on('tap', '[data-japp]', function (D) {
        D.preventDefault()
        A(e(D.currentTarget))
      })
    }
  }

  function A (K) {
    var L = K.data('japp'),
      D = K.data('jappconf')
    var G = g.indexOf(c, L) != -1
    if (typeof K.data('openwindow') != 'undefined') {
      G = !!K.data('openwindow')
    }
    if (G) {
      var E =
        K.data('windowsetting') ||
        'width=700,height=680,left=75,top=20,scrollbars=no,status=no,resizable=no,menubar=no,toolbar=no,scrollbars=no,location=yes'
      K.data('openwindow', window.open('', K.data('openwindow'), E))
    }
    var H = K.data(),
      I = K.data('jappfedata'),
      F = {}
    if (!g.isUndefined(I) && I.length > 0) {
      I = I.split(',')
    }
    if (g.isUndefined(I) || I.length > 0) {
      for (var J in H) {
        if (H.hasOwnProperty(J)) {
          if (
            g.indexOf(['japp', 'jappconf', 'jappfedata', 'openwindow'], J) == -1
          ) {
            if (g.isUndefined(I) || g.indexOf(I, J) != -1) {
              F[J] = H[J]
            }
          }
        }
      }
    }
    g.loadJApp(L, K, D, F)
  }
  var h = [],
    a = b.pagelet_block_class || 'pagelet-block',
    r = b.pagelet_block_loading_class || 'pagelet-block-asyncloading'

  function o (E, D) {
    if (E in h) {
      g.error('pagelet id already defined')
    }
    h[E] = D
  }

  function m (D) {
    g.mix(this, D)
    if (this.container.length) {
      !g.isEmptyObject(this.events) &&
        m.createEvents(this.container, this.events, this)
      typeof this.init == 'function' && this.init()
    }
  }
  g.mix(m.prototype, {
    syncXHR: null,
    autoAbortPrevSync: true,
    getSyncParams: function (D) {
      return D
        ? this.__private_data.sync_params[D]
        : this.__private_data.sync_params
    },
    setSyncParams: function (E, D) {
      g.mix(this.__private_data.sync_params, E)
      if (D) {
        this.sync()
      }
    },
    getSyncApi: function () {
      return this.__private_data.sync_api
    },
    setSyncApi: function (D) {
      this.__private_data.sync_api = D
    },
    sync: function () {
      var D = this.getSyncApi()
      if (D) {
        if (this.autoAbortPrevSync) {
          try {
            this.syncXHR && this.syncXHR.abort()
          } catch (E) {}
        }
        g.Event(this).fire('before content sync')
        this.syncXHR = m.loadContent(
          D,
          this.getSyncParams(),
          this.container,
          e.proxy(function (F) {
            this.syncHtml(F.html)
            this.syncData(F.controller_data)
            g.Event(this).fire('content sync success')
          }, this),
          e.proxy(function (F) {
            g.Event(this).fire('content sync fail', F)
          }, this),
          e.proxy(function () {
            g.Event(this).fire('content sync complete')
          }, this)
        )
      }
    },
    abortSync: function () {
      try {
        this.syncXHR && this.syncXHR.abort()
      } catch (D) {}
    },
    syncHtml: function (D) {
      this.container.html(D)
    },
    syncData: function (D) {
      g.mix(this.data, D)
    }
  })
  g.mix(m, {
    createInstance: function (E, D) {
      var G = E.data('params')
      G = g.isObject(G) && !g.isEmptyObject(G) ? G : {}
      var F = new m(
        g.mix(
          {
            __private_data: {
              sync_api: E.data('api'),
              sync_params: G
            },
            data: g.mix({}, E.data('controller_data')),
            container: E
          },
          D
        )
      )
      g.Event.fire('pagelet loaded', {
        id: E.attr('id'),
        pagelet: F
      })
      g.Event.fire('pagelet ' + E.attr('id') + ' loaded', {
        pagelet: F
      })
      return F
    },
    createEvents: function (D, F, E) {
      g.forEach(F, function (H, G) {
        var I =
          typeof H == 'function'
            ? e.proxy(H, E)
            : H in E
            ? e.proxy(E[H], E)
            : null
        if (I) {
          var J = G.split(',')
          if (J.length == 1) {
            D.on(J[0], I)
          } else {
            if (J.length == 2) {
              D.on(J[0], J[1], I)
            } else {
              g.error('invalid pagelet event key:', G)
            }
          }
        } else {
          g.error('can not find event handler:', H)
        }
      })
    },
    loadContent: function (K, I, D, G, J, L) {
      var F = K.split(':'),
        H = '',
        E = ''
      if (F.length > 2) {
        if (F[0] == 'apps') {
          H = F[1]
          E = F.slice(2)
          E.unshift('apps')
        } else {
          if (F[0] === '') {
            H = F[1]
            E = F.slice(2)
          }
        }
      }
      if (E.length) {
        I = g.isObject(I) && !g.isEmptyObject(I) ? I : {}
        D.addClass(r)
        return e.ajax({
          dataType: 'jsonp',
          data: {
            params: JSON.stringify(I)
          },
          url: z + '/' + H + '/' + E.join('/'),
          success: function (N) {
            if (N && N.data) {
              typeof G == 'function' && G(N.data)
            } else {
              var O = {
                type: 'business_error',
                error: (N && N.error) || {}
              }
              typeof J == 'function' && J(O)
            }
          },
          error: function (O, Q, P) {
            var N = {
              type: 'http_error',
              error: {
                xhr: O,
                status: Q
              }
            }
            typeof J == 'function' && J(N)
          },
          complete: function () {
            D.removeClass(r)
            typeof L == 'function' && L()
          }
        })
      }
    },
    loadAsyncContent: function (E) {
      var D = e('#' + E)
      if (D.length && D.data('async') && D.data('api')) {
        m.loadContent(
          D.data('api'),
          D.data('params'),
          D,
          function (F) {
            y(
              {
                css_list: F.css
              },
              function () {
                if (F.js && F.js.length) {
                  g.loadResource(F.js, function () {
                    m.finishLoadAsyncContent(D, F)
                  })
                } else {
                  m.finishLoadAsyncContent(D, F)
                }
              }
            )
          },
          function (F) {
            g.error(F)
          }
        )
      }
    },
    finishLoadAsyncContent: function (E, F) {
      var D = E.attr('id')
      F.html && E.html(F.html)
      F.controller_data && E.data('controller_data', F.controller_data)
      g.Event.fire('pagelet ' + D + ' async content loaded')
      g.Event.fire('new html appended')
    },
    runPagelet: function (E) {
      E.removeAttr('data-pagelet')
      E.addClass(a)
      var D = E.attr('id')
      if (E.data('async')) {
        if (g.Event.isFired('pagelet ' + D + ' async content loaded')) {
          m.runPageletBlock(E)
        } else {
          g.Event.on('pagelet ' + D + ' async content loaded', function () {
            m.runPageletBlock(E)
          })
        }
        m.loadAsyncContent(D)
      } else {
        m.runPageletBlock(E)
      }
    },
    runPageletBlock: function (F) {
      var D = F.data('controller'),
        E = F.attr('id')
      if (D) {
        g.Module.wait([D], function () {
          g.closure(function (G) {
            o(E, m.createInstance(F, G(D)))
          })
        })
      } else {
        o(E, m.createInstance(F, {}))
      }
    }
  })
  g.Pagelet = {
    getInstance: function (D) {
      return h[D] || null
    },
    wait: function (D, E) {
      if (g.Event.isFired('pagelet ' + D + ' loaded')) {
        typeof E == 'function' && E(h[D])
      } else {
        g.Event.on('pagelet ' + D + ' loaded', function (F) {
          typeof E == 'function' && E(F.pagelet)
        })
      }
    },
    createInstance: m.createInstance,
    createFromContainer: function (F, E) {
      var D = e('#' + F),
        H = e.trim(D.data('style')),
        I = H.length ? H.split(',') : [],
        J = D.data('params') || {},
        G = D.data('api'),
        E = E || {}
      if (D.length) {
        g.fetchCSSJS(I, function () {
          if (G) {
            m.loadContent(
              G,
              J,
              D,
              function (K) {
                y(
                  {
                    css_list: K.css
                  },
                  function () {
                    if (K.js && K.js.length) {
                      g.loadResource(K.js, function () {
                        m.finishLoadAsyncContent(D, K)
                        o(F, m.createInstance(D, E))
                      })
                    } else {
                      m.finishLoadAsyncContent(D, K)
                      o(F, m.createInstance(D, E))
                    }
                  }
                )
              },
              function (K) {
                g.error(K)
              }
            )
          } else {
            o(F, m.createInstance(D, E))
          }
        })
      } else {
        g.error('invalid pagelet container id')
      }
    },
    runAllPagelet: function () {
      e('[data-pagelet]').each(function () {
        m.runPagelet(e(this))
      })
    }
  }
  e(function () {
    g.Pagelet.runAllPagelet()
    g.Event.on('new html appended', function () {
      g.Pagelet.runAllPagelet()
    })
  })
})(window)
;(function () {
  var c = window.Env || {}
  $(document)
    .delegate('[data-cs-t] .clickstat', 'click', d)
    .delegate('[data-cs-t] a', 'click', d)

  function d (k) {
    var m = $(k.currentTarget),
      g = m.closest('[data-cs-t]').data('cs-t'),
      i = m.closest('[data-cs-p]').data('cs-p'),
      h = (m.attr('target') || '').toLowerCase(),
      l = m.data('cs-l'),
      e = m.data('cs-d'),
      f = true
    if (!g || g.length === 0 || !i || i.length === 0) {
      return
    }
    if (m.is('a')) {
      if (!l || l.length === 0) {
        f = false
        l = m.get(0).href || m.get(0).getAttribute('href', 2) || ''
      }
      if (!e || e.length === 0) {
        e = m.attr('title') || ''
        e = e.replace(new RegExp('\n|\r', 'g'), '')
        e = $.trim(e.replace(new RegExp('</?.+?>', 'g'), ''))
      }
      var j = window.name.toLowerCase()
      if ('' === h || '_self' == h || '_parent' == h || '_top' == h) {
        b(g, i, l, e, f ? null : m)
      } else {
        if ('_blank' == h || j != h) {
          b(g, i, l, e, null)
        } else {
          b(g, i, l, e, f ? null : m)
        }
      }
    } else {
      if (!l || l.length === 0) {
        if (m.is('input')) {
          l = $.trim(m.val())
        }
      }
      b(g, i, l, e, null)
    }
  }

  function b (g, h, j, e, f) {
    if (!f) {
      var i =
        (c.WWW_HOST ? location.protocol + '//' + c.WWW_HOST : '') + '/cs.php'
      $.ajax({
        url: i,
        dataType: 'jsonp',
        data: {
          t: g,
          p: h,
          l: j,
          d: e
        },
        jsonp: 'cb'
      })
    } else {
      if (
        '/' == j.substr(0, 1) ||
        location.protocol + '//' == j.substr(0, 7).toLowerCase()
      ) {
        var m = c.WWW_HOST ? location.protocol + '//' + c.WWW_HOST : '',
          k = m + '/cs.php',
          l = k.length
        if (k != j.substr(0, l)) {
          f.attr(
            'href',
            m +
              '/cs.php?t=' +
              encodeURIComponent(g) +
              '&p=' +
              encodeURIComponent(h) +
              '&l=' +
              encodeURIComponent(j) +
              '&d=' +
              encodeURIComponent(e)
          )
          f.attr('data-href', j)
        }
      } else {
        b(g, h, j, e, null)
      }
    }
  }
  if (window.M && window.M.Utils) {
    M.Utils.clickStat = b
  }

  function a (e) {
    if (!('action' in e)) {
      e.action = 'add_op_logs'
    }
    var f =
      (c.WWW_HOST ? location.protocol + '//' + c.WWW_HOST : '') +
      '/ajax/ajax_logs.php'
    $.ajax({
      url: f,
      dataType: 'jsonp',
      data: e
    })
  }
  if (window.M && window.M.Utils) {
    M.Utils.opLog = a
  }
})()
if (!window.M) {
  window.M = {}
}
if (!window.Env) {
  window.Env = {}
}
if (!window.mLogImg) {
  window.mLogImg = []
}
if (!window.mLogPost) {
  window.mLogPost = []
}

function mxPageGuid () {}
mxPageGuid.generate = function () {
  var a = mxPageGuid._getRandomInt,
    c = mxPageGuid._hexAligner
  return (
    c(a(32), 8) +
    '-' +
    c(a(16), 4) +
    '-' +
    c(16384 | a(12), 4) +
    '-' +
    c(32768 | a(14), 4) +
    '-' +
    c(a(48), 12)
  )
}
mxPageGuid._getRandomInt = function (a) {
  return 0 > a
    ? NaN
    : 30 >= a
    ? 0 | (Math.random() * (1 << a))
    : 53 >= a
    ? (0 | (1073741824 * Math.random())) +
      1073741824 * (0 | (Math.random() * (1 << (a - 30))))
    : NaN
}
mxPageGuid._getIntAligner = function (a) {
  return function (c, b) {
    for (
      var d = c.toString(a), e = b - d.length, f = '0';
      0 < e;
      e >>>= 1, f += f
    ) {
      e & 1 && (d = f + d)
    }
    return d
  }
}
mxPageGuid._hexAligner = mxPageGuid._getIntAligner(16)
window.Env.uPageId = mxPageGuid.generate()
var xstringify = (function () {
  function b (d) {
    ;/["\\\x00-\x1f]/.test(d) &&
      (d = d.replace(/["\\\x00-\x1f]/g, function (f) {
        var e = c[f]
        if (e) {
          return e
        }
        e = f.charCodeAt()
        return '\\u00' + Math.floor(e / 16).toString(16) + (e % 16).toString(16)
      }))
    return d
  }
  var c = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
  }
  return function (k) {
    switch (typeof k) {
      case 'undefined':
        return '{}'
      case 'number':
        return isFinite(k) ? String(k) : 'null'
      case 'string':
        return b(k)
      case 'boolean':
        return String(k)
      default:
        if (k instanceof Array) {
          var j = ['['],
            a = k.length,
            m,
            i,
            h
          for (i = 0; i < a; i++) {
            switch (((h = k[i]), typeof h)) {
              case 'undefined':
              case 'function':
              case 'unknown':
                break
              default:
                m && j.push(','), j.push(xstringify(h)), (m = 1)
            }
          }
          j.push(']')
          return j.join('')
        }
        m = ['{']
        i = xstringify
        for (a in k) {
          if (Object.prototype.hasOwnProperty.call(k, a)) {
            switch (((h = k[a]), typeof h)) {
              case 'undefined':
              case 'unknown':
              case 'function':
                break
              default:
                j && m.push(','),
                  (j = 1),
                  m.push('"' + i(a) + '":"' + i(h) + '"')
            }
          }
        }
        m.push('}')
        return m.join('')
    }
  }
})()
var mfwCommonEnv = {}
mfwCommonEnv.aIncludes = function (b, a) {
  return b.indexOf(a) !== -1
}
mfwCommonEnv.getDevice = function (a) {
  if (/Windows Phone/i.test(a) || /WPDesktop/.test(a)) {
    return 'Windows Phone'
  } else {
    if (/iPad/.test(a)) {
      return 'iPad'
    } else {
      if (/iPod/.test(a)) {
        return 'iPod Touch'
      } else {
        if (/iPhone/.test(a)) {
          return 'iPhone'
        } else {
          if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
            return 'BlackBerry'
          } else {
            if (/Android/.test(a)) {
              return 'Android'
            } else {
              return 'unknown'
            }
          }
        }
      }
    }
  }
}
mfwCommonEnv.getOs = function (a) {
  if (/Windows/i.test(a)) {
    if (/Phone/.test(a) || /WPDesktop/.test(a)) {
      return 'Windows Phone'
    }
    return 'Windows'
  } else {
    if (/(iPhone|iPad|iPod)/.test(a)) {
      return 'iOS'
    } else {
      if (/Android/.test(a)) {
        return 'Android'
      } else {
        if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
          return 'BlackBerry'
        } else {
          if (/Mac/i.test(a)) {
            return 'Mac OS X'
          } else {
            if (/Linux/.test(a)) {
              return 'Linux'
            } else {
              return 'unknown'
            }
          }
        }
      }
    }
  }
}
mfwCommonEnv.getBrowser = function (b, c, a) {
  c = c || ''
  if (a || this.aIncludes(b, ' OPR/')) {
    if (this.aIncludes(b, 'Mini')) {
      return 'Opera Mini'
    }
    return 'Opera'
  } else {
    if (/(BlackBerry|PlayBook|BB10)/i.test(b)) {
      return 'BlackBerry'
    } else {
      if (this.aIncludes(b, 'IEMobile') || this.aIncludes(b, 'WPDesktop')) {
        return 'Internet Explorer Mobile'
      } else {
        if (this.aIncludes(b, 'Edge')) {
          return 'Microsoft Edge'
        } else {
          if (this.aIncludes(b, 'FBIOS')) {
            return 'Facebook Mobile'
          } else {
            if (this.aIncludes(b, 'Chrome')) {
              return 'Chrome'
            } else {
              if (this.aIncludes(b, 'CriOS')) {
                return 'Chrome iOS'
              } else {
                if (this.aIncludes(b, 'FxiOS')) {
                  return 'Firefox iOS'
                } else {
                  if (this.aIncludes(c, 'Apple')) {
                    if (this.aIncludes(b, 'Mobile')) {
                      return 'Mobile Safari'
                    }
                    return 'Safari'
                  } else {
                    if (this.aIncludes(b, 'Android')) {
                      return 'Android Mobile'
                    } else {
                      if (this.aIncludes(b, 'Konqueror')) {
                        return 'Konqueror'
                      } else {
                        if (this.aIncludes(b, 'Firefox')) {
                          return 'Firefox'
                        } else {
                          if (
                            this.aIncludes(b, 'MSIE') ||
                            this.aIncludes(b, 'Trident/')
                          ) {
                            return 'Internet Explorer'
                          } else {
                            if (this.aIncludes(b, 'Gecko')) {
                              return 'Mozilla'
                            } else {
                              return 'unknown'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
mfwCommonEnv.getOsVersion = function (c) {
  var a = 'unknow'
  if (/Windows/i.test(c)) {
    if (/Phone/.test(c)) {
      a = c.substr(
        c.indexOf('Phone') + 6,
        c.indexOf(';', c.indexOf('Phone')) - c.indexOf('Phone') - 6
      )
    } else {
      if (/WPDesktop/.test(c)) {
        a = 'WPDesktop_unknow'
      } else {
        a = 'Windows_unknow'
      }
    }
  } else {
    if (/(iPhone|iPad|iPod)/.test(c)) {
      var d = /OS [\d._]*/gi
      var b = c.match(d)
      a = (b + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')
    } else {
      if (/Android/.test(c)) {
        a = c.substr(
          c.indexOf('Android') + 8,
          c.indexOf(';', c.indexOf('Android')) - c.indexOf('Android') - 8
        )
      } else {
        if (/(BlackBerry|PlayBook|BB10)/i.test(c)) {
          if (/BB10/.test(c)) {
            a = c.substr(
              c.indexOf('BB10') + 5,
              c.indexOf(';', c.indexOf('BB10')) - c.indexOf('BB10') - 5
            )
          } else {
            a = 'BlackBerry_unknow'
          }
        } else {
          if (/Mac OS X/i.test(c)) {
            var d = /OS X [\d._]*/gi
            var b = c.match(d)
            a = (b + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.')
          } else {
            a = 'Linux_unknow'
          }
        }
      }
    }
  }
  return a
}
mfwCommonEnv.getBrowserVersion = function (f, g, a) {
  var c = this.getBrowser(f, g, a)
  var b = {
    'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
    'Microsoft Edge': /Edge\/(\d+(\.\d+)?)/,
    Chrome: /Chrome\/(\d+(\.\d+)?)/,
    'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
    Safari: /Version\/(\d+(\.\d+)?)/,
    'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
    Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
    Firefox: /Firefox\/(\d+(\.\d+)?)/,
    'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
    Konqueror: /Konqueror:(\d+(\.\d+)?)/,
    BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
    'Android Mobile': /android\s(\d+(\.\d+)?)/,
    'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
    Mozilla: /rv:(\d+(\.\d+)?)/
  }
  var d = b[c]
  if (d === undefined) {
    return 'unknown'
  }
  var e = f.match(d)
  if (!e) {
    return 'unknown'
  }
  return parseFloat(e[e.length - 2])
}
mfwCommonEnv.getCliInfo = function () {
  var b = b || {}
  var c = window.navigator
  var a = c.userAgent
  b.brn = this.getBrowser(a, c.vendor, window.opera)
  b.brv = this.getBrowserVersion(a, c.vendor, window.opera)
  b.dev = this.getDevice(a)
  b.os_name = this.getOs(a)
  b.os_ver = this.getOsVersion(a)
  return b
}
var mfwSendLog = {}
mfwSendLog._compelete = 0
mfwSendLog._receive = 0
mfwSendLog.checkEnviroment = function () {
  if (!window) {
    return 'window'
  }
  if (!document) {
    return 'document'
  }
  if (!navigator) {
    return 'navigator'
  }
  if (!screen) {
    return 'screen'
  }
}
mfwSendLog.postDataFormat = function (c) {
  if (typeof FormData == 'function') {
    var a = new FormData()
    for (var b in c) {
      a.append(b, c[b])
    }
    return a
  } else {
    var a = new Array()
    for (var b in c) {
      a.push(b + '=' + c[b])
    }
    return a.join('&')
  }
}
mfwSendLog.getDataFormat = function (c) {
  var a = new Array()
  for (var b in c) {
    a.push(b + '=' + c[b])
  }
  return a.join('&')
}
mfwSendLog.sendByImg = function (g, b, k) {
  var i = new Image(1, 1),
    j = 'mfw_' + Math.floor(2147483648 * Math.random()).toString(36)
  window.mLogImg[j] = i
  i.onload = i.onerror = function () {
    i.onload = i.onerror = null
    i = window.mLogImg[j] = null
    if (typeof k == 'function') {
      k()
    }
  }
  var f = String(new Date().getTime()) + String(Math.random())
  var h = b || {}
  h._nocache = f
  h._method = 'img'
  var a = g + '?' + this.getDataFormat(h)
  i.src = a
}
mfwSendLog.sendByBeacon = function (d, a, f) {
  var b = String(new Date().getTime()) + String(Math.random())
  var e = a || {}
  e._nocache = b
  e._method = 'beacon'
  if (typeof FormData == 'function') {
    return window.navigator.sendBeacon
      ? window.navigator.sendBeacon(d, this.postDataFormat(e))
        ? (f(), !0)
        : !1
      : !1
  } else {
    return window.navigator.sendBeacon
      ? window.navigator.sendBeacon(d + '?' + this.getDataFormat(e))
        ? (f(), !0)
        : !1
      : !1
  }
}
mfwSendLog.sendByPost = function (f, a, j) {
  var i = window.XMLHttpRequest,
    b = String(new Date().getTime()) + String(Math.random())
  if (!i) {
    return !1
  }
  var h = new i()
  window.mLogPost[b] = h
  if (!('withCredentials' in h)) {
    return !1
  }
  var g = a || {}
  g._nocache = b
  g._method = 'post'
  h.open('POST', f, !0)
  h.withCredentials = !0
  if (typeof FormData == 'undefined') {
    h.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  }
  h.onreadystatechange = function () {
    4 == h.readyState && (j(), (h = window.mLogPost[b] = null))
  }
  h.send(this.postDataFormat(g))
  return !0
}
mfwSendLog.init = function (b, a, d) {
  d = d || function () {}
  this.sendByPost(b, a, d) ||
    this.sendByBeacon(b, a, d) ||
    this.sendByImg(b, a, d)
}
var mfwPageEvent = (function () {
  return function (o, j, d, l) {
    var i = encodeURIComponent
    var m = document.URL
    var a = document.referrer
    var p = parseInt(+new Date() / 1000, 10)
    o = i(o)
    j = i(j)
    m = i(m)
    a = i(a)
    d = i(xstringify(d))
    var k = mfwCommonEnv.getCliInfo()
    k = i(xstringify(k))
    var h = Math.floor(2443463648 * Math.random())
    var g = window.Env.uPageId
    if (o && j) {
      if (mfwSendLog.checkEnviroment()) {
        return false
      }
      var e = {
        ac: o,
        ec: j,
        u: m,
        r: a,
        ex: k,
        ar: d,
        t: p,
        pid: g,
        rn: h
      }
      var n = window.Env.TONGJI_HOST
        ? window.Env.TONGJI_HOST
        : 'tongji.mafengwo.cn'
      var b =
        ('https:' == document.location.protocol ? 'https://' : 'http://') +
        n +
        '/track_event.gif'
      mfwSendLog.init(b, e, l)
    }
  }
})()
;(function () {
  var a = {
    _getFlash: function () {
      var d, e
      if (window.ActiveXObject) {
        for (d = 12; d > 0; d--) {
          try {
            e = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + d)
            return d + '.0'
          } catch (f) {}
        }
      } else {
        if (navigator.plugins && navigator.plugins.length) {
          for (d = 0; d < navigator.plugins.length; d++) {
            if (navigator.plugins[d].name.indexOf('Shockwave Flash') != -1) {
              return navigator.plugins[d].description.split(' ')[2]
            }
          }
        }
      }
      return 'Not enabled'
    },
    _getCururl: function () {
      var b = document.URL
      return encodeURIComponent(b)
    },
    _getDomain: function () {
      var b = '',
        d = window.location.hostname,
        c = d.replace(/\.(com|net|org|cn$)\.?.*/, '')
      if (c.lastIndexOf('.') == -1) {
        b = '.' + d
      } else {
        c = c.substring(c.lastIndexOf('.'))
        b = d.substring(d.lastIndexOf(c))
      }
      return b
    },
    _getRandomInt: function (c) {
      return 0 > c
        ? NaN
        : 30 >= c
        ? 0 | (Math.random() * (1 << c))
        : 53 >= c
        ? (0 | (1073741824 * Math.random())) +
          1073741824 * (0 | (Math.random() * (1 << (c - 30))))
        : NaN
    },
    _getWindowSize: function () {
      var c = -1,
        e = -1
      'number' == typeof window.innerWidth
        ? ((c = window.innerWidth), (e = window.innerHeight))
        : document.documentElement &&
          (document.documentElement.clientWidth ||
            document.documentElement.clientHeight)
        ? ((c = document.documentElement.clientWidth),
          (e = document.documentElement.clientHeight))
        : document.body &&
          (document.body.clientWidth || document.body.clientHeight) &&
          ((c = document.body.clientWidth), (e = document.body.clientHeight))
      return c + 'x' + e
    },
    _getScreenSize: function () {
      return screen ? screen.width + 'x' + screen.height : '-1x-1'
    },
    _getSystemLang: function () {
      return navigator.userLanguage
        ? navigator.userLanguage
        : navigator.language
        ? navigator.language
        : navigator.browserLanguage
        ? navigator.browserLanguage
        : 'unknown'
    },
    _getChartset: function () {
      var b
      b = document.characterSet || document.charset || 'unknown'
      return b
    },
    _includes: function (c, b) {
      return c.indexOf(b) !== -1
    },
    _setCookie: function (j, h, g) {
      var i = ''
      var e = this._getDomain()
      if (g) {
        i = new Date(new Date().getTime() + g * 3600000)
        i = '; expires=' + i.toGMTString()
      }
      document.cookie =
        j + '=' + encodeURIComponent(h) + i + ';domain=' + e + ';path=/; '
    },
    _getCookie: function (f) {
      var h = ''
      var d = f + '='
      if (document.cookie.length > 0) {
        var g = document.cookie.indexOf(d)
        if (g != -1) {
          g += d.length
          var e = document.cookie.indexOf(';', g)
          if (e == -1) {
            e = document.cookie.length
          }
          h = decodeURIComponent(document.cookie.substring(g, e))
        }
      }
      return h
    },
    _getVisitn: function () {
      var b = this._getCookie('__mfwvn')
      if (isNaN(b)) {
        b = 0
      }
      return b
    },
    _getTimeOnPage: function () {
      var b = this._getCookie('__mfwlt')
      var c = parseInt(+new Date() / 1000, 10)
      if (isNaN(b)) {
        b = 0
      }
      var d = parseInt(c - b)
      this._setCookie('__mfwlt', c, 24 * 365)
      return d
    },
    _getVisitlv: function () {
      var c = this._getCookie('__mfwlv')
      var b = this._getVisitn()
      if (isNaN(c)) {
        c = 0
      }
      if (+new Date() / 1000 - c > 7200) {
        c = parseInt(+new Date() / 1000, 10)
        b++
        this._setCookie('__mfwlv', c, 24 * 365)
        this._setCookie('__mfwvn', b, 24 * 365)
      }
      return c
    },
    _run: function () {
      if (mfwSendLog.checkEnviroment()) {
        return false
      }
      var d = this._getParams()
      var b = window.Env.TONGJI_HOST
        ? window.Env.TONGJI_HOST
        : 'tongji.mafengwo.cn'
      var c =
        ('https:' == document.location.protocol ? 'https://' : 'http://') +
        b +
        '/stat_click.gif'
      mfwSendLog.init(c, d)
    },
    _getCliInfo: function () {
      return mfwCommonEnv.getCliInfo()
    },
    _getParams: function () {
      var q = document,
        m = window.location,
        h = parseInt(+new Date() / 1000, 10)
      var x = '1.2'
      var o = encodeURIComponent(m.host) || '-'
      var g = encodeURIComponent(q.referrer) || 'direct'
      var s = encodeURIComponent(q.title)
      var p = this._getWindowSize()
      var n = this._getScreenSize()
      var k = this._getSystemLang()
      var j = this._getRandomInt(32)
      var y = this._getCururl() || '-'
      var c = this._getFlash()
      var v = this._getVisitlv()
      var i = this._getVisitn() || '1'
      var u = this._getChartset()
      var f = this._getTimeOnPage() || '0'
      var b = this._getCliInfo()
      var e = window.Env.uPageId
      var w = window.Env.salesId || '0'
      var r = {
        t: h,
        hn: o,
        u: y,
        r: g,
        lv: v,
        vn: i,
        ws: p,
        sc: n,
        sl: k,
        fl: c,
        cs: u,
        dt: s,
        sts: f,
        pid: e,
        brn: b.brn,
        brv: b.brv,
        dev: b.dev,
        os: b.os_name,
        os_ver: b.os_ver,
        sid: w,
        ver: x,
        rdm: j
      }
      return r
    }
  }
  if (!window.Env.statistics_loaded) {
    a._run()
    window.Env.statistics_loaded = true
  }
})()
var mfwCheckLogData = (function () {
  return function () {
    var e = encodeURIComponent
    var c = parseInt(+new Date() / 1000, 10)
    var b = document.URL
    var d = document.referrer
    var a = {
      t: c,
      u: e(b),
      r: e(d),
      pid: window.Env.uPageId
    }
    return xstringify(a)
  }
})()
;(function () {
  var c = {
    events: [],
    opening: parseInt(+new Date() / 1000, 10),
    scrolls: 0,
    clicks: 0,
    blurTime: 0,
    closing: 0,
    submitted: false
  }
  var b = {
    track: {
      focus: true,
      blur: true,
      click: true,
      scroll: true
    }
  }

  function d (f) {
    f = f || window.event
    var e = {}
    e.type = f.type
    e.timeStamp = parseInt(+new Date())
    c.events.push(e)
  }
  var a = {
    init: function (e) {
      for (var f in b.track) {
        if (b.track[f]) {
          a.addEvent(window, f, d)
        }
      }
      a.addEvent(window, 'beforeunload', a.save)
      a.addEvent(document, 'pagehide', a.save)
      a.addEvent(window, 'unload', a.save)
      a.addEvent(document, 'click', a.saveClickArea)
      a.addEvent(window, 'load', a.savePageLoadTime)
      a.guid = a.createGuid()
    },
    save: function () {
      if (c.submitted) {
        return
      }
      c.submitted = true
      c.closing = parseInt(+new Date() / 1000, 10)
      c.events = a.compress(c.events)
      var g = xstringify,
        i = encodeURIComponent,
        h = new Date().getTimezoneOffset() / 60,
        k = c.closing - c.opening,
        j = k - c.blurTime,
        e = e || {}
      e = {
        scrolls: c.scrolls,
        clicks: c.clicks,
        opening: c.opening,
        closing: c.closing,
        time_on_page: k,
        time_focus: j,
        tz: h,
        referrer: i(document.referrer) || 'direct'
      }
      !!mfwPageEvent && mfwPageEvent('page_behavior', 'page_behaviors', e)
    },
    compress: function () {
      var g = [],
        h = 0,
        e = 0,
        k = 0
      for (var f = 0; f < c.events.length; f++) {
        var j = c.events[f]
        if (!j.timeStamp) {
          return
        }
        if (j.type === 'click') {
          if (j.timeStamp - e > 1000) {
            g.push(j)
            c.clicks++
          }
          e = j.timeStamp
        } else {
          if (j.type === 'scroll') {
            if (j.timeStamp - h > 1000) {
              g.push(j)
              c.scrolls++
            }
            h = j.timeStamp
          } else {
            if (j.type === 'blur') {
              if (k === 0) {
                k = j.timeStamp
              }
              g.push(j)
            } else {
              if (j.type === 'focus') {
                if (k !== 0) {
                  c.blurTime += parseInt((j.timeStamp - k) / 1000)
                  k = 0
                }
                g.push(j)
              }
            }
          }
        }
      }
      if (k !== 0) {
        c.blurTime += c.closing - parseInt(k / 1000)
      }
      return g
    },
    addEvent: function (g, e, f) {
      if (document.attachEvent) {
        if (g) {
          g.attachEvent('on' + e, f)
        } else {
          window.attachEvent('on' + e, f)
        }
      } else {
        if (document.addEventListener) {
          if (g) {
            g.addEventListener(e, f, false)
          } else {
            window.addEventListener(e, f, false)
          }
        }
      }
    },
    getClickStat: function (h) {
      if (!window.jQuery) {
        return {
          cst: '',
          csp: '',
          csl: '',
          csd: ''
        }
      }
      var f = $(h)
      var g = f.closest('[data-cs-t]').data('cs-t') || ''
      var i = f.closest('[data-cs-p]').data('cs-p') || ''
      var e = f.closest('[data-cs-l]').data('cs-l') || ''
      var j = f.closest('[data-cs-d]').data('cs-d') || ''
      return {
        cst: g,
        csp: i,
        csl: e,
        csd: j
      }
    },
    sortEvents: function (f, e) {
      if (!f.timeStamp) {
        return -1
      }
      if (!e.timeStamp) {
        return 1
      }
      if (f.timeStamp < e.timeStamp) {
        return -1
      }
      if (f.timeStamp >= e.timeStamp) {
        return 1
      }
    },
    getXpath: function (l) {
      var i = []
      for (; l && l.nodeType == 1; l = l.parentNode) {
        var g = 0
        for (var k = l.previousSibling; k; k = k.previousSibling) {
          if (k.tagName == l.tagName) {
            ++g
          }
        }
        var h = l.tagName.toLowerCase()
        var j = g ? '[' + (g + 1) + ']' : ''
        i.splice(0, 0, h + j)
      }
      return i.length ? '/' + i.join('/') + '/' : null
    },
    savePageLoadTime: function () {
      var e = 0
      var i =
        window.performance ||
        window.msPerformance ||
        window.webkitPerformance ||
        window.mozPerformance
      var h = {}
      if (i && i.timing) {
        var g = i.timing
        var f = new Date().getTime()
        h.loadPage = (f - g.navigationStart) / 1000
        h.domReady = (g.domComplete - g.responseEnd) / 1000
        h.connect = (g.connectEnd - g.connectStart) / 1000
        h.request = (g.responseEnd - g.requestStart) / 1000
        h.redirect = (g.redirectEnd - g.redirectStart) / 1000
        h.reqPrepareTime = (g.connectEnd - g.navigationStart) / 1000
        h.pageLoadingTime = (f - g.domLoading) / 1000
        h.dnsTime = (g.domainLookupEnd - g.domainLookupStart) / 1000
        h.whitePageTime = (g.responseEnd - g.navigationStart) / 1000
        h.navigationStart = g.navigationStart
        h.redirectStart = g.redirectStart
        h.redirectEnd = g.redirectEnd
        h.fetchStart = g.fetchStart
        h.domainLookupStart = g.domainLookupStart
        h.domainLookupEnd = g.domainLookupEnd
        h.connectStart = g.connectStart
        h.connectEnd = g.connectEnd
        h.requestStart = g.requestStart
        h.requestEnd = g.requestEnd
        h.responseStart = g.responseStart
        h.responseEnd = g.responseEnd
        h.domLoading = g.domLoading
        h.domInteractive = g.domInteractive
        h.domContentLoad = g.domContentLoad
        h.domComplete = g.domComplete
        h.loadEventStart = g.loadEventStart
        h.loadEventEnd = g.loadEventEnd
        h.loadPage = h.loadPage > 100 || h.loadPage < 0 ? 0 : h.loadPage
        h.domReady = h.domReady > 100 || h.domReady < 0 ? 0 : h.domReady
        h.connect = h.connect > 100 || h.connect < 0 ? 0 : h.connect
        h.request = h.request > 100 || h.request < 0 ? 0 : h.request
        h.redirect = h.redirect > 100 || h.redirect < 0 ? 0 : h.redirect
        h.reqPrepareTime =
          h.reqPrepareTime > 100 || h.reqPrepareTime < 0 ? 0 : h.reqPrepareTime
        h.pageLoadingTime =
          h.pageLoadingTime > 100 || h.pageLoadingTime < 0
            ? 0
            : h.pageLoadingTime
        h.dnsTime = h.dnsTime > 100 || h.dnsTime < 0 ? 0 : h.dnsTime
        h.whitePageTime =
          h.whitePageTime > 100 || h.whitePageTime < 0 ? 0 : h.whitePageTime
        h.guid = a.guid
        !!mfwPageEvent && mfwPageEvent('default', 'performance', h)
      }
    },
    saveResourceTime: function () {
      var e = 0
      var m =
        window.performance ||
        window.msPerformance ||
        window.webkitPerformance ||
        window.mozPerformance
      var l = new Array()
      var h = encodeURIComponent
      if (m && typeof m.getEntries === 'function') {
        var g = m.getEntries()
        if (g instanceof Array) {
          for (var k in g) {
            var i = g[k]
            var j = {}
            if (i !== undefined) {
              j.name = i.name
              j.entryType = i.entryType
              if (i.duration !== undefined) {
                j.duration = i.duration.toFixed(2)
              }
              j.initiatorType = i.initiatorType
              j.guid = a.guid
              l.push(j)
            }
          }
        }
      }
      if (l.length > 0) {
        !!mfwPageEvent && mfwPageEvent('default', 'resource', l)
      }
    },
    saveClickArea: function (m) {
      var r, u, s, l, w
      if (!m) {
        m = window.event
      }
      r = m.srcElement || m.target || null
      try {
        s = r.tagName.toLowerCase()
      } catch (m) {
        return
      }
      if (s && r.parentNode && r.parentNode.tagName) {
        l = r.parentNode.tagName.toLowerCase()
      }
      if (l && r.parentNode.parentNode && r.parentNode.parentNode.tagName) {
        var k = r.parentNode.parentNode.tagName
        w = k ? k.toLowerCase() : ''
      }
      var q = 0
      if (
        'a' == s ||
        'input' == s ||
        'button' == s ||
        'object' == s ||
        'embed' == s ||
        'img' == s
      ) {
        q = 1
      } else {
        if ('a' == l || 'button' == l) {
          q = 1
          r = r.parentNode
        } else {
          if ('a' == w || 'button' == w) {
            q = 1
            r = r.parentNode.parentNode
          }
        }
      }
      var j = j || {}
      if (q) {
        var p = '',
          v = '',
          e = encodeURIComponent
        p = r.getAttribute('data-href') || r.href || ''
        if ('' == p) {
          p = r.data
        }
        if ('' == v) {
          v = r.getAttribute('title') || ''
        }
        var o = e(a.getXpath(r))
        var n = a.getClickStat(r)
        if (!n.csl || n.csl.length === 0) {
          n.csl = p
        }
        if (!n.csd || n.csd.length === 0) {
          n.csd = v
        }
        j = {
          xpath: o,
          lc: p,
          text: n.csd ? '' : v,
          tagname: s || l,
          referer: e(document.referrer) || 'direct'
        }
        var i
        if (window.jQuery) {
          i = $.extend({}, j, n)
        } else {
          i = j
        }
        !!mfwPageEvent && mfwPageEvent('default', 'click_area', i)
      }
    },
    createGuid: function () {
      function e () {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
      }
      return (
        e() + e() + '-' + e() + '-' + e() + '-' + e() + '-' + e() + e() + e()
      )
    }
  }
  a.init()
})()
;(function (d) {
  var a = '_js_mobileLog'
  if (!d.m_debug) {
    d.m_debug = function (g, f) {
      b(g, f)
    }
    d.m_debug.hide = function () {
      $('#' + a).hide()
    }
    d.m_debug.clear = function () {
      $('#' + a)
        .children('div')
        .first()
        .html('')
    }
    d.m_debug.log = function (g, f) {
      b(g, f)
    }
    d.m_debug.logCurrent = function (f) {
      b(f, 'clear')
    }
  }

  function c (f) {
    $(
      '<div id="' +
        a +
        '" style="position:fixed; left:0; bottom:5px; padding: 25px 10px 10px;background-color: rgba(0, 0, 0, .6);z-index: 1000; font-size: 12px;color: #fff;line-height: 20px;"><span style="padding:0 3px;color: #f00;position: absolute;right:5px;top:5px;cursor: pointer;z-index: 1;" class="mobileLogcClose">??????????????</span><div style="max-height: 250px;overflow-y: auto;">' +
        f +
        '</div></div>'
    ).appendTo($('body'))
  }

  function b (k, j) {
    if (!window.Env.debug) {
      return
    }
    var l = $('#' + a)
    var h = ''
    if (typeof k == 'string' || typeof k == 'number') {
      h += e(k)
    } else {
      if ({}.toString.call(k) == '[object Array]') {
        for (var g = 0, f = k.length; g < f; g++) {
          h += e(k[g])
        }
      } else {
        if ({}.toString.call(k) == '[object Object]') {
          for (var g in k) {
            if (k.hasOwnProperty(g)) {
              if (typeof k[g] == 'string' || typeof k[g] == 'number') {
                h += e(k[g], g)
              } else {
                h += e(JSON.stringify(k[g]), g)
              }
            }
          }
        } else {
          return
        }
      }
    }
    j == 'clear' && d.m_debug.clear()
    h +=
      '<div style="height: 1px; background-color: #fff; margin: 10px 0;"></div>'
    if (!l.length) {
      c(h)
    } else {
      l.children('div')
        .first()
        .prepend($(h))
    }
    l.show()
  }

  function e (h, f) {
    var g = '<p>'
    f &&
      (g +=
        '<strong style="color: #f00; font-weight: normal;">' +
        f +
        ': </strong>')
    g += '<span>' + h + '</span>'
    g += '</p>'
    return g
  }
  $(document).on('click', '.mobileLogcClose', function (f) {
    d.m_debug.hide()
    d.m_debug.clear()
  })
})(window)
;(function () {
  var c = {
    reportImage: 'https://topic.mafengwo.cn/ad/c.php?',
    posList: []
  }
  var m = 0
  var d = 0
  var i = 'acm'
  var p = 'ads-output-block-w-m'
  if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (B, A) {
      var z = (A || document).getElementsByTagName('*')
      var C = new Array()
      for (var y = 0; y < z.length; y++) {
        var E = z[y]
        var D = E.className.split(' ')
        for (var x = 0; x < D.length; x++) {
          if (D[x] == B) {
            C.push(E)
            break
          }
        }
      }
      return C
    }
  }

  function v (y, z) {
    var x = y.getAttribute('data-' + i + z) || y.dataset[i + z]
    return typeof x == 'undefined' || null == x ? '' : x
  }

  function t (x) {
    var y = x.offsetLeft
    var z = x.offsetParent
    while (z !== null) {
      y += z.offsetLeft
      z = z.offsetParent
    }
    return y
  }

  function h (x) {
    var y = x.offsetTop
    var z = x.offsetParent
    while (z !== null) {
      y += z.offsetTop
      z = z.offsetParent
    }
    return y
  }

  function u (x) {
    return x.offsetWidth
  }

  function a (x) {
    return x.offsetHeight
  }

  function b () {
    if (window.innerWidth) {
      m = window.innerWidth
    } else {
      if (document.body && document.body.clientWidth) {
        m = document.body.clientWidth
      }
    }
    if (window.innerHeight) {
      d = window.innerHeight
    } else {
      if (document.body && document.body.clientHeight) {
        d = document.body.clientHeight
      }
    }
    if (
      document.documentElement &&
      document.documentElement.clientHeight &&
      document.documentElement.clientWidth
    ) {
      d = document.documentElement.clientHeight
      m = document.documentElement.clientWidth
    }
  }

  function r (y) {
    var z = ''
    var x = c.posList[y].dom
    z += '&task=' + v(x, 'task') + '&type=' + v(x, 'type')
    return z
  }

  function e (y) {
    if (!c.posList[y].beingExposed) {
      c.posList[y].beingExposed = true
      if (c.posList[y].exposedTimes < 1) {
        var x = new Image()
        x.src = c.reportImage + 't=' + +new Date() + r(y)
        c.posList[y].exposedTimes++
      }
    }
  }

  function o () {
    var A =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    var y = d + A
    for (var z = 0; z < c.posList.length; z++) {
      var x = c.posList[z].dom
      if (x) {
        var C = h(x)
        var B = a(x)
        if (y > C && A < C + B) {
          e(z)
        } else {
          c.posList[z].beingExposed = false
        }
      }
    }
  }

  function g (B, y, x) {
    var z = null
    var A
    return function () {
      var D = this
      var E = arguments
      var C = +new Date()
      clearTimeout(z)
      if (!A) {
        A = C
      }
      if (C - A >= x) {
        B.apply(D, E)
        A = C
      } else {
        z = setTimeout(function () {
          B.apply(D, E)
        }, y)
      }
    }
  }

  function q (x, A, z) {
    try {
      x.addEventListener(A, z, false)
    } catch (y) {
      try {
        x.attachEvent('on' + A, z)
      } catch (y) {
        x['on' + A] = z
      }
    }
  }
  var j = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]'
  }

  function n (y) {
    for (var x = 0; x < c.posList.length; x++) {
      if (c.posList[x].id == y) {
        return true
      }
    }
    return false
  }

  function w () {
    var z = document.getElementsByClassName(p)
    for (var y = 0; y < z.length; y++) {
      var x = v(z[y], 'task')
      var A = v(z[y], 'type')
      if ('' != x && !n(x)) {
        c.posList.push({
          id: x,
          type: A,
          beingExposed: false,
          exposedTimes: 0,
          dom: z[y]
        })
      }
    }
    if (c.posList.length > 0) {
      o()
    }
  }

  function k (x) {
    if (
      document.readyState == 'complete' ||
      document.readyState == 'interactive'
    ) {
      x()
    } else {
      if (document.addEventListener) {
        document.addEventListener(
          'DOMContentLoaded',
          function () {
            document.removeEventListener(
              'DOMContentLoaded',
              arguments.callee,
              false
            )
            x()
          },
          false
        )
      } else {
        if (document.attachEvent) {
          document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') {
              document.detachEvent('onreadystatechange', arguments.callee)
              x()
            }
          })
        } else {
          window.onload = x
        }
      }
    }
  }
  var l = 0

  function f () {
    var x = document.getElementsByTagName('body')
    if (x.length < 1) {
      if (20 > ++l) {
        setTimeout(f, 500)
      }
    } else {
      q(x[0], 'DOMNodeInserted', w)
    }
  }

  function s () {
    b()
    w()
    q(window, 'resize', b)
    q(window, 'scroll', g(o, 50, 100))
    f()
  }
  k(s)
})()
;(function () {
  window.MFWAPP_deprecated_sdk_0_x = {}
  window.MfwJsSDKBaseTool = {}
  window.MFWAPP_deprecated_sdk_0_x.init = function () {
    var a = MFWAPP_deprecated_sdk_0_x
    a.core = {}
    a.core.createNativeCallUrl = function (c) {
      var b =
        'http://EE2BA792-3EBA-8932-32D0-1711829CC789/' +
        encodeURIComponent(JSON.stringify(c))
      return b
    }
    a.core.changeBlockDict = {}
    a.core.failBlockDict = {}
    a.core.cancelBlockDict = {}
    a.core.finishBlockDict = {}
    a.core.uniqueId = 0
    a.core.dataQueue = []
    a.core.isRunning = false
    a.core.enabled = navigator.userAgent.indexOf('mfwjssdk') != -1
    a.core.callNativeByUrl = function (b) {
      window.location.href = b
    }
    a.core.runAsynchronous = true
    a.core.run = function () {
      if (a.core.runAsynchronous) {
        if (!a.core.isRunning && a.core.dataQueue.length > 0) {
          a.core.isRunning = true
          a.core.callNativeByUrl(a.core.dataQueue.shift())
        }
      } else {
        a.core.callNativeByUrl(a.core.dataQueue.shift())
      }
    }
    a.core.hello = function () {
      if (a.core.runAsynchronous) {
        a.core.isRunning = false
        a.core.run()
      }
    }
    a.core.execData = function (e, h, c, i, j, g) {
      if (a.core.enabled == false) {
        return
      }
      var d = 'cb_' + a.core.uniqueId++ + '_' + new Date().getTime()
      var f = {
        action: e,
        data: h,
        callBackId: d
      }
      a.core.changeBlockDict[d] = c
      a.core.failBlockDict[d] = j
      a.core.cancelBlockDict[d] = i
      a.core.finishBlockDict[d] = g
      var b = a.core.createNativeCallUrl(f)
      a.core.dataQueue.push(b)
      a.core.run()
    }
    a.core.onChange = function (b) {
      var d = JSON.parse(decodeURIComponent(b))
      var c = d.callBackId
      var e = a.core.changeBlockDict[c]
      if (e) {
        e(d.data)
      }
    }
    a.core.clearBlock = function (b) {
      a.core.changeBlockDict[b] = null
      a.core.failBlockDict[b] = null
      a.core.cancelBlockDict[b] = null
      a.core.finishBlockDict[b] = null
    }
    a.core.onFail = function (b) {
      var d = JSON.parse(decodeURIComponent(b))
      var c = d.callBackId
      var e = a.core.failBlockDict[c]
      if (e) {
        e(d.data)
      }
      a.core.clearBlock(c)
    }
    a.core.onCancel = function (b) {
      var d = JSON.parse(decodeURIComponent(b))
      var c = d.callBackId
      var e = a.core.cancelBlockDict[c]
      if (e) {
        e(d.data)
      }
      a.core.clearBlock(c)
    }
    a.core.onFinish = function (b) {
      var d = JSON.parse(decodeURIComponent(b))
      var c = d.callBackId
      var e = a.core.finishBlockDict[c]
      if (e) {
        e(d.data)
      }
      a.core.clearBlock(c)
    }
    MfwJsSDKBaseTool = a.core
    a.core.checkApi = function (b) {
      var d = {
        apis: b.apis
      }
      var c = b.onFinish
      a.core.execData('checkApi', d, null, null, null, function (h) {
        var g = h.result
        var f = []
        for (var e = 0; e < g.length; e++) {
          var j = g[e]
          f[e] = {
            api: j.api,
            isExist: j.isExist == 'true'
          }
        }
        c(f)
      })
    }
    a.apis = {}
    a.apis.v0_1 = {}
    a.apis.v0_1.webview = {
      setTitle: function (b) {
        var c = {
          title: b.title
        }
        a.core.execData('setTitle', c, null, null, null, null)
      },
      setSubTitle: function (b) {
        var c = {
          title: b.title
        }
        a.core.execData('setSubTitle', c, null, null, null, null)
      },
      close: function (b) {
        var c = {}
        a.core.execData('close', c, null, null, null, null)
      },
      openNewPage: function (b) {
        if (b.url) {
          if (b.url.indexOf('sharejump.php') >= 0) {
            a.core.callNativeByUrl(b.url)
          } else {
            a.core.callNativeByUrl(
              'https://m.mafengwo.cn/nb/public/sharejump.php?type=0&url=' +
                encodeURIComponent(b.url)
            )
          }
        }
      }
    }
    a.apis.v0_1.login = {
      hasLoggedIn: function (c) {
        try {
          var f = new RegExp('(^| )mfw_uid=([^;]*)(;|$)')
          var b = document.cookie.match(f)
          var d = !b || !b[2] || b[2].length == 0 || b[2] == '0'
          return {
            hasLoggedIn: d ? 0 : 1
          }
        } catch (g) {
          return {
            hasLoggedIn: 0
          }
        }
      },
      showLogin: function (c) {
        var b = a.apis.v0_1.login.hasLoggedIn()
        if (b && !b.hasLoggedIn) {
          var d = c.successCallback
          a.core.callNativeByUrl(
            'travelguide://page/login?callback=' + encodeURIComponent(d)
          )
        }
      }
    }
    a.apis.v0_1.share = {
      showSharePanel: function (b) {
        a.core.callNativeByUrl('travelguide://page/appshare')
      }
    }
    a.apis.v0_1.pay = {
      isMFWPayAvailable: function (b) {
        var d = {}
        var c = b.onFinish
        a.core.execData('isMFWPayAvailable', d, null, null, null, function (e) {
          c({
            available: e.available == 'true' ? 1 : 0
          })
        })
      },
      isAlipayAvailable: function (b) {
        var d = {}
        var c = b.onFinish
        a.core.execData('isAlipayAvailable', d, null, null, null, function (e) {
          c({
            available: e.available == 'true' ? 1 : 0
          })
        })
      },
      isWechatPayAvailable: function (b) {
        var d = {}
        var c = b.onFinish
        a.core.execData('isWeixinPayAvailable', d, null, null, null, function (
          e
        ) {
          c({
            available: e.available == 'true' ? 1 : 0
          })
        })
      },
      isApplePayAvailable: function (b) {
        var d = {}
        var c = b.onFinish
        a.core.execData('isApplePayAvailable', d, null, null, null, function (
          e
        ) {
          c({
            available: e.available == 'true' ? 1 : 0
          })
        })
      },
      payWithApplePay: function (b) {
        var d = {
          orderString: b.orderString
        }
        var c = b.onFinish
        a.core.execData('payWithApplePay', d, null, null, null, function (e) {
          c({
            statusCode: e.resultStatus | 0,
            errorMessage: e.memo,
            errorDetail: e.detail,
            userinfo: e.userinfo
          })
        })
      },
      payWithAlipay: function (b) {
        var d = {
          orderString: b.orderString
        }
        var c = b.onFinish
        a.core.execData('payWithAlipay', d, null, null, null, function (e) {
          c({
            orderId: e.id,
            statusCode: e.resultStatus | 0,
            errorMessage: e.memo
          })
        })
      },
      payWithWechat: function (b) {
        var d = {
          orderString: b.orderString
        }
        var c = b.onFinish
        a.core.execData('payWithWechat', d, null, null, null, function (e) {
          c({
            orderId: e.id,
            statusCode: e.resultStatus | 0,
            errorMessage: e.memo
          })
        })
      }
    }
    a.apis.v0_1.hotel = {
      showDateIntervalPicker: function (c) {
        var d = {
          begin: c.beginDate,
          end: c.endDate
        }
        var e = c.onCancel
        var b = c.onSelect
        a.core.execData(
          'pickDate',
          d,
          null,
          function () {
            e()
          },
          null,
          function (f) {
            b({
              beginDate: f.begin,
              endDate: f.end
            })
          }
        )
      }
    }
    a.apis.v0_1.daka = {
      updateTodayDakaResult: function (b) {
        var c = {
          dakaResult: b.hasDaka == 1 ? '1' : '0'
        }
        a.core.execData('dakaResult', c, null, null, null, null)
      },
      getDakaAlarm: function (b) {
        var d = {
          loadFinishInfo: 'showMeDakaAlarm'
        }
        var c = b.onFinish
        a.core.execData('JSLoadFinish', d, null, null, null, function (e) {
          c({
            alarmTime: e.dakaAlarmString
          })
        })
      },
      showDakaAlarmSetting: function (b) {
        var d = {
          dakaAlarmState: b.status
        }
        var e = b.onCancel
        var c = b.onFinish
        a.core.execData(
          'dakaAlarmUpdate',
          d,
          null,
          function (f) {
            e(f)
          },
          null,
          function (f) {
            c({
              alarmTime: f.newAlarmStr || undefined
            })
          }
        )
      }
    }
    a.apis.v0_1.image = {
      showImages: function (b) {
        var c = {
          imgs: b.imageUrls,
          index: b.defaultSelectedIndex
        }
        a.core.execData('showImages', c, null, null, null, null)
      }
    }
    a.apis.v0_1.poi = {
      notifyPOICorrectUploadResult: function (b) {
        var c = {
          code: b.result
        }
        a.core.execData('showToast', c, null, null, null, null)
      }
    }
    a.apis.v0_2 = {}
    a.apis.v0_2.webview = {
      setNavigationBarDisplay: function (b) {
        var c = {
          display: b.display,
          animate: b.animate
        }
        a.core.execData('setNavigationBarDisplay', c, null, null, null, null)
      }
    }
  }
})()
;(function () {
  window.MFWAPP = {}

  function e () {
    MFWAPP.userAgent = {}
    var h = navigator.userAgent
    var f = h.split(' ')
    var j = ''
    for (var g = 0; g < f.length; g++) {
      var k = f[g].split('/')
      if (k.length == 2) {
        MFWAPP.userAgent[k[0]] = k[1]
        j = k[0]
      } else {
        if (k.length == 1 && j != '') {
          MFWAPP.userAgent[j] = MFWAPP.userAgent[j] + ' ' + k[0]
        }
      }
    }
    if (
      MFWAPP.userAgent.mfwappcode == undefined ||
      MFWAPP.userAgent.mfwappver == undefined ||
      MFWAPP.userAgent.mfwjssdk == undefined
    ) {
      return false
    }
    return true
  }

  function c () {
    MFWAPP.sdk = {
      compareVersion: function (g, f) {
        if (!g && g) {
          return -1
        } else {
          if (g && !g) {
            return 1
          } else {
            if (!g && !g) {
              return 0
            }
          }
        }
        var k = g.split('.')
        var j = f.split('.')
        var h = 0
        for (; h < Math.min(k.length, j.length); h++) {
          if ((k[h] | 0) > (j[h] | 0)) {
            return 1
          } else {
            if ((k[h] | 0) < (j[h] | 0)) {
              return -1
            }
          }
        }
        if (k.length > h) {
          return 1
        } else {
          if (j.length > h) {
            return 1
          } else {
            return 0
          }
        }
      },
      isVersionGTE: function (g, f) {
        if (
          g &&
          MFWAPP.sdk.isiOS &&
          MFWAPP.sdk.compareVersion(MFWAPP.sdk.appver, g) >= 0
        ) {
          return true
        }
        if (
          f &&
          MFWAPP.sdk.isAndroid &&
          MFWAPP.sdk.compareVersion(MFWAPP.sdk.appver, f) >= 0
        ) {
          return true
        }
        return false
      },
      _isDefined: function (f, g) {
        g.split('.').forEach(function (h) {
          f = f && f[h]
        })
        return typeof f != 'undefined' && f !== null
      },
      has: function (f) {
        return MFWAPP.sdk._isDefined(MFWAPP, f)
      }
    }
    MFWAPP.sdk.version = '1.0'
    MFWAPP.sdk.appcode = MFWAPP.userAgent.mfwappcode
    MFWAPP.sdk.appver = MFWAPP.userAgent.mfwappver
    MFWAPP.sdk.appsdkver = MFWAPP.userAgent.mfwjssdk
    MFWAPP.sdk.apiver = MFWAPP.sdk._isDefined(MFWAPP.userAgent, 'mfwappjsapi')
      ? MFWAPP.userAgent.mfwappjsapi
      : MFWAPP.sdk.appsdkver
    MFWAPP.sdk.isiOS =
      MFWAPP.sdk.appcode == 'cn.mafengwo.www' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.tgminhouse' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.www.ipad' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.tgminhouse.ipad' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.www.retaildemo' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.office' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.merchant' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.merchantinhouse'
    MFWAPP.sdk.isAndroid =
      MFWAPP.sdk.appcode == 'com.mfw.roadbook' ||
      MFWAPP.sdk.appcode == 'com.mfw.roadbook.dailybuild' ||
      MFWAPP.sdk.appcode == 'com.mfw.office' ||
      MFWAPP.sdk.appcode == 'com.mfw.office.dailybuild' ||
      MFWAPP.sdk.appcode == 'com.mfw.merchant' ||
      MFWAPP.sdk.appcode == 'com.mfw.merchant.dailybuild'
    MFWAPP.sdk.isMFWAPP =
      MFWAPP.sdk.appcode == 'cn.mafengwo.www' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.tgminhouse' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.www.ipad' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.tgminhouse.ipad' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.www.retaildemo' ||
      MFWAPP.sdk.appcode == 'com.mfw.roadbook' ||
      MFWAPP.sdk.appcode == 'com.mfw.roadbook.dailybuild'
    MFWAPP.sdk.isMFWOffice =
      MFWAPP.sdk.appcode == 'cn.mafengwo.office' ||
      MFWAPP.sdk.appcode == 'com.mfw.office' ||
      MFWAPP.sdk.appcode == 'com.mfw.office.dailybuild'
    MFWAPP.sdk.isMerchantApp =
      MFWAPP.sdk.appcode == 'cn.mafengwo.merchant' ||
      MFWAPP.sdk.appcode == 'cn.mafengwo.merchantinhouse' ||
      MFWAPP.sdk.appcode == 'com.mfw.merchant' ||
      MFWAPP.sdk.appcode == 'com.mfw.merchant.dailybuild'
    MFWAPP.sdk.isRetailDemo = MFWAPP.sdk.appcode == 'cn.mafengwo.www.retaildemo'
    MFWAPP.sdk.showRetailDemoNotEnabledTip = function () {
      if (MFWAPP.sdk.isRetailDemo) {
        if (MFWAPP.sdk.has('tips.showTip')) {
          MFWAPP.tips.showTip({
            title: '????????????',
            text: '??????????????????????? ????????????????????????????????????????????????????',
            buttons: ['??????????????????????????????????????????????'],
            onClick: function (f) {}
          })
        } else {
          alert('??????????????????????? ????????????????????????????????????????????????????')
        }
      }
    }
    MFWAPP.sdk.cookie = {}
    ;(function () {
      var g = document.cookie.split('; ')
      for (var f = 0; f < g.length; f++) {
        var h = g[f].split('=')
        if (h.length == 2) {
          MFWAPP.sdk.cookie[h[0]] = decodeURIComponent(h[1])
        }
      }
    })()
    MFWAPP.sdk.openudid = MFWAPP.sdk.cookie.__openudid
  }

  function d () {
    MFWAPP.Calabash = {}
    MFWAPP.Calabash.core = {}
    MFWAPP.Calabash.core.nativeApis = {}
    MFWAPP.Calabash.core.initNativeApis = function () {
      var i = {}
      if (typeof MFWAPPSDKWKWebViewContext != 'undefined') {
        i = JSON.parse(MFWAPPSDKWKWebViewContext.nativeAPIs)
      } else {
        i = MFWAPP.Calabash.core.doCallNative(
          'core',
          'checkNativeAPIs',
          {},
          '',
          1
        )
      }
      MFWAPP.Calabash.core.nativeApis = i
      for (var g in i) {
        if (i.hasOwnProperty(g)) {
          if (MFWAPP[g] == undefined || MFWAPP[g] == null) {
            MFWAPP[g] = {}
          }
          var h = i[g]
          if (h.methods) {
            for (var f in h.methods) {
              if (h.methods.hasOwnProperty(f)) {
                var j = h.methods[f]
                MFWAPP[g][
                  f
                ] = MFWAPP.Calabash.core.createJSModuleMethodForNativeApi(
                  g,
                  f,
                  j.method_type,
                  j.callback_type || '',
                  j.sync_return ? 1 : 0
                )
              }
            }
          }
        }
      }
    }
    MFWAPP.Calabash.core.createJSModuleMethodForNativeApi = function (
      j,
      h,
      i,
      f,
      g
    ) {
      return function (k) {
        return MFWAPP.Calabash.core.doCallNative(j, h, k, i, f, g)
      }
    }
    MFWAPP.Calabash.core.callbackData = {
      startId: 0,
      callbacks: {}
    }
    MFWAPP.Calabash.core.checkPathAvaiable = function (f, g) {
      g.split('.').forEach(function (h) {
        f = f && f[h]
      })
      return typeof f != 'undefined' && f !== null
    }
    MFWAPP.Calabash.core.doCallNative = function (j, f, o, p, n, t) {
      var l = {
        module: j,
        method: f,
        params: {}
      }
      var q = 0
      for (var m in o) {
        if (o.hasOwnProperty(m)) {
          if (typeof o[m] !== 'function') {
            l.params[m] = o[m]
          } else {
            l.params[m] = 'function'
            q++
          }
        }
      }
      if (q > 0 && (n == 'callback' || n == 'delegate' || n == 'jsfunction')) {
        var r =
          'mfwapp_jscb_' +
          j +
          '_' +
          f +
          '_' +
          MFWAPP.Calabash.core.callbackData.startId++ +
          '_' +
          new Date().getTime()
        var h = {
          params: o,
          type: n,
          callback_id: r,
          module: j,
          method: f
        }
        MFWAPP.Calabash.core.callbackData.callbacks[r] = h
        l.callback_id = r
      }
      if (typeof MFWAPPSDKWKWebViewContext != 'undefined') {
        if (p == 'property') {
          return MFWAPPSDKWKWebViewContext.properties[j][f]
        } else {
          var g = MFWAPP.Calabash.core.createNativeCallUrl(l)
          MFWAPP.Calabash.core.callNativeByUrl(g)
        }
      } else {
        var s = null
        if (MFWAPP.sdk.isiOS) {
          var g = MFWAPP.Calabash.core.createNativeCallUrl(l)
          MFWAPP.Calabash.core.callNativeByUrl_syncResultTransmitFunction = function (
            k
          ) {
            s = k
          }
          MFWAPP.Calabash.core.callNativeByUrl(g)
          MFWAPP.Calabash.core.callNativeByUrl_syncResultTransmitFunction = undefined
        } else {
          if (
            MFWAPPSDKNativeFunction != undefined &&
            typeof MFWAPPSDKNativeFunction.JSCallNative != 'undefined'
          ) {
            var i = JSON.stringify(l)
            s = MFWAPPSDKNativeFunction.JSCallNative(i)
          }
        }
        if (typeof s == 'string') {
          return JSON.parse(s)
        }
      }
      return undefined
    }
    MFWAPP.Calabash.core.filterCallbackArguments = function (g, i, f) {
      var h = g.module
      var j = g.method
      if (MFWAPP.sdk.isAndroid && !MFWAPP.sdk.isVersionGTE('0', '8.0')) {
        if (h == 'tips' && j == 'showTip' && i == 'onClick') {
          if (f.clickedIndex == 0) {
            f.clickedIndex = 1
          } else {
            if (f.clickedIndex == 1) {
              f.clickedIndex = 0
            }
          }
        }
      }
      return f
    }
    MFWAPP.Calabash.core.handleCallback = function (j, l, g) {
      var i = ''
      var f = MFWAPP.Calabash.core.callbackData.callbacks[j]
      if (f != undefined) {
        try {
          g = JSON.parse(g)
          if (
            MFWAPP.Calabash.core.filterCallbackArguments != undefined &&
            typeof MFWAPP.Calabash.core.filterCallbackArguments == 'function'
          ) {
            g = MFWAPP.Calabash.core.filterCallbackArguments(f, l, g)
          }
          if (f.type == 'jsfunction') {
            var h = f.params[l](g)
            h = JSON.stringify(h)
            if (h) {
              i = h
            }
          } else {
            setTimeout(function () {
              f.params[l](g)
            }, 10)
          }
          if (f.type != 'delegate' && f.type != 'jsfunction') {
            MFWAPP.Calabash.core.callbackData.callbacks[j] = undefined
            delete MFWAPP.Calabash.core.callbackData.callbacks[j]
          }
        } catch (k) {
          console.log(k)
        }
      }
      return i
    }
    MFWAPP.Calabash.core.createNativeCallUrl = function (g) {
      var f =
        'mfwappjscall://AE2A4689-8813-4697-8AA6-D86F3D5F5D3A/' +
        encodeURIComponent(JSON.stringify(g))
      return f
    }
    MFWAPP.Calabash.core.callNativeByUrl = function (f) {
      if (MFWAPP.sdk.isAndroid) {
        window.location.href = f
      } else {
        if (MFWAPP.sdk.isiOS) {
          var g = document.createElement('iframe')
          g.setAttribute('src', f)
          document.documentElement.appendChild(g)
          g.parentNode.removeChild(g)
          g = null
        }
      }
    }
    if (MFWAPP.sdk.compareVersion(MFWAPP.sdk.appsdkver, '1.0') >= 0) {
      MFWAPP.Calabash.core.initNativeApis()
    } else {
      if (typeof MFWAPP_deprecated_sdk_0_x != 'undefined') {
        a()
      }
    }
  }

  function a () {
    MFWAPP_deprecated_sdk_0_x.init()
    if (!MFWAPP.sdk.isVersionGTE('7.3', '7.5.1')) {
      MFWAPP_deprecated_sdk_0_x.apis.v0_1.pay.isMFWPayAvailable = function (m) {
        if (m.onFinish) {
          m.onFinish({
            available: 0
          })
        }
      }
    }
    if (!MFWAPP.sdk.isVersionGTE('7.5', '9999')) {
      MFWAPP_deprecated_sdk_0_x.apis.v0_1.pay.isApplePayAvailable = function (
        m
      ) {
        if (m.onFinish) {
          m.onFinish({
            available: 0
          })
        }
      }
      MFWAPP_deprecated_sdk_0_x.apis.v0_1.pay.payWithApplePay = undefined
    }
    MFWAPP_deprecated_sdk_0_x.core.callNativeByUrl =
      MFWAPP.Calabash.core.callNativeByUrl
    MFWAPP_deprecated_sdk_0_x.core.runAsynchronous = !MFWAPP.sdk.isiOS
    for (var j in MFWAPP_deprecated_sdk_0_x.apis) {
      if (MFWAPP_deprecated_sdk_0_x.apis.hasOwnProperty(j)) {
        var g = j
          .substring(1)
          .split('_')
          .join('.')
        if (MFWAPP.sdk.compareVersion(MFWAPP.sdk.apiver, g) < 0) {
          continue
        }
        var i = MFWAPP_deprecated_sdk_0_x.apis[j]
        for (var h in i) {
          if (i.hasOwnProperty(h)) {
            var f = i[h]
            if (typeof MFWAPP[h] == 'undefined') {
              MFWAPP[h] = {}
            }
            for (var l in f) {
              if (f.hasOwnProperty(l)) {
                var k = f[l]
                MFWAPP[h][l] = k
              }
            }
          }
        }
      }
    }
  }

  function b () {
    MFWAPP.EventCenter = {
      _eventListeners: {},
      addEventListener: function (f, h) {
        if (typeof h != 'function') {
          return
        }
        var g = MFWAPP.EventCenter._eventListeners[f]
        if (!g) {
          g = []
          MFWAPP.EventCenter._eventListeners[f] = g
        }
        g.push(h)
      },
      fireEvent: function (f, j) {
        var h = MFWAPP.EventCenter._eventListeners[f]
        if (h) {
          for (var g in h) {
            if (h.hasOwnProperty(g)) {
              h[g]({
                data: j
              })
            }
          }
        }
      }
    }
    if (!MFWAPP.share) {
      MFWAPP.share = {}
    }
    MFWAPP.share.event_addShareResultListener = function (f) {
      if (f) {
        MFWAPP.EventCenter.addEventListener(
          'MFWAPP.share.ShareResult',
          function (g) {
            f(g.data)
          }
        )
      }
    }
    window.mfw_appshareh5resultcallback = function (g, i) {
      var h = ''
      var f = ''
      if (MFWAPP.sdk.isiOS) {
        switch (g) {
          case 1:
            h = 'sinaweibo'
            break
          case 22:
            h = 'wechatsession'
            break
          case 23:
            h = 'wechattimeline'
            break
          case 37:
            h = 'wechatfav'
            break
          case 6:
            h = 'qzone'
            break
          case 24:
            h = 'qqfriend'
            break
          case 996:
            h = 'im'
            break
          default:
            break
        }
        switch (i) {
          case 1:
            f = 'success'
            break
          case 2:
            f = 'failed'
            break
          case 3:
            f = 'cancelled'
            break
          default:
            break
        }
      } else {
        if (MFWAPP.sdk.isAndroid) {
          switch (g) {
            case 1:
              h = 'sinaweibo'
              break
            case 22:
              h = 'wechatsession'
              break
            case 23:
              h = 'wechattimeline'
              break
            case 37:
              h = 'wechatfav'
              break
            case 6:
              h = 'qzone'
              break
            case 24:
              h = 'qqfriend'
              break
            case 996:
              h = 'im'
              break
            default:
              break
          }
          if (g == 'Weibo') {
            h = 'sinaweibo'
          } else {
            if (g == 'Wechat') {
              h = 'wechatsession'
            } else {
              if (g == 'WechatMoments') {
                h = 'wechattimeline'
              } else {
                if (g == 'WechatFavorite') {
                  h = 'wechatfav'
                } else {
                  if (g == 'QZone') {
                    h = 'qzone'
                  } else {
                    if (g == 'QQ') {
                      h = 'qqfriend'
                    } else {
                      if (g == 'IM') {
                        h = 'im'
                      }
                    }
                  }
                }
              }
            }
          }
          switch (i) {
            case 1:
              f = 'success'
              break
            case 0:
              f = 'cancelled'
              break
            case -1:
              f = 'failed'
              break
            default:
              break
          }
        }
      }
      if (f) {
        setTimeout(function () {
          MFWAPP.EventCenter.fireEvent('MFWAPP.share.ShareResult', {
            channel: h,
            status: f,
            raw: {
              type: g,
              state: i
            }
          })
        }, 100)
      }
    }
  }
  ;(function () {
    if (!e()) {
      window.MFWAPP = undefined
      delete window.MFWAPP
      return
    }
    c()
    if (!window.Env || !window.Env.disable_app_sdk) {
      d()
    }
    b()
    if (typeof window.MFWAPP_deprecated_sdk_0_x != 'undefined') {
      window.MFWAPP_deprecated_sdk_0_x = undefined
      delete window.MFWAPP_deprecated_sdk_0_x
    }
    document.addEventListener('DOMContentLoaded', function (f) {
      if (MFWAPP.sdk.has('webview.documentContentLoaded')) {
        MFWAPP.webview.documentContentLoaded()
      }
    })
  })()
})()
