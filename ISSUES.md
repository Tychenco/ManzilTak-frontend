1. ## Error Type
Console Error

## Error Message
MISSING_MESSAGE: Could not resolve `About` in messages for locale `en`.


    at About (src\app\[locale]\(marketing)\about\page.tsx:25:13)
    at resolveErrorDev (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1895:106)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1448:28)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1562:50)
    at Object.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1386:17)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1616:50)
    at Array.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at resolveConsoleEntry (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2021:96)
    at processFullStringRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2422:17)
    at processFullBinaryRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2362:9)
    at processBinaryChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2471:221)
    at progress (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2641:13)
    at Next.MetadataOutlet (<anonymous>:null:null)

## Code Frame
  23 |   const { locale } = await props.params;
  24 |   setRequestLocale(locale);
> 25 |   const t = await getTranslations({
     |             ^
  26 |     locale,
  27 |     namespace: 'About',
  28 |   });

Next.js version: 16.1.6 (Turbopack)


2. ## Error Type
Console Error

## Error Message
MISSING_MESSAGE: Could not resolve `Portfolio` in messages for locale `en`.


    at Portfolio (src\app\[locale]\(marketing)\portfolio\page.tsx:26:13)
    at resolveErrorDev (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1895:106)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1448:28)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1562:50)
    at Object.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1386:17)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1616:50)
    at Array.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at resolveConsoleEntry (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2021:96)
    at processFullStringRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2422:17)
    at processFullBinaryRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2362:9)
    at processBinaryChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2471:221)
    at progress (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2641:13)
    at Portfolio (<anonymous>:null:null)

## Code Frame
  24 |   const { locale } = await props.params;
  25 |   setRequestLocale(locale);
> 26 |   const t = await getTranslations({
     |             ^
  27 |     locale,
  28 |     namespace: 'Portfolio',
  29 |   });

Next.js version: 16.1.6 (Turbopack)


3. ## Error Type
Console Error

## Error Message
MISSING_MESSAGE: Could not resolve `Portfolio` in messages for locale `en`.


    at Portfolio (src\app\[locale]\(marketing)\portfolio\page.tsx:26:13)
    at resolveErrorDev (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1895:106)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1448:28)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1562:50)
    at Object.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1386:17)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1616:50)
    at Array.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at resolveConsoleEntry (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2021:96)
    at processFullStringRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2422:17)
    at processFullBinaryRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2362:9)
    at processBinaryChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2471:221)
    at progress (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2641:13)
    at Portfolio (<anonymous>:null:null)

## Code Frame
  24 |   const { locale } = await props.params;
  25 |   setRequestLocale(locale);
> 26 |   const t = await getTranslations({
     |             ^
  27 |     locale,
  28 |     namespace: 'Portfolio',
  29 |   });

Next.js version: 16.1.6 (Turbopack)


4. ## Error Type
Console Error

## Error Message
MISSING_MESSAGE: Could not resolve `Counter` in messages for locale `en`.


    at Module.generateMetadata (src\app\[locale]\(marketing)\counter\page.tsx:12:13)
    at resolveErrorDev (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1895:106)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1448:28)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1562:50)
    at Object.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1386:17)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1616:50)
    at Array.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at resolveConsoleEntry (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2021:96)
    at processFullStringRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2422:17)
    at processFullBinaryRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2362:9)
    at processBinaryChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2471:221)
    at progress (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2641:13)
    at Next.MetadataOutlet (<anonymous>:null:null)

## Code Frame
  10 | }): Promise<Metadata> {
  11 |   const { locale } = await props.params;
> 12 |   const t = await getTranslations({
     |             ^
  13 |     locale,
  14 |     namespace: 'Counter',
  15 |   });

Next.js version: 16.1.6 (Turbopack)


5. ## Error Type
Console Error

## Error Message
MISSING_MESSAGE: Could not resolve `Counter` in messages for locale `en`.


    at Counter (src\app\[locale]\(marketing)\counter\page.tsx:24:28)
    at resolveErrorDev (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1895:106)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1448:28)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1562:50)
    at Object.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1386:17)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1616:50)
    at Array.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at resolveConsoleEntry (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2021:96)
    at processFullStringRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2422:17)
    at processFullBinaryRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2362:9)
    at processBinaryChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2471:221)
    at progress (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2641:13)
    at Counter (<anonymous>:null:null)

## Code Frame
  22 |
  23 | export default function Counter() {
> 24 |   const t = useTranslations('Counter');
     |                            ^
  25 |
  26 |   return (
  27 |     <>

Next.js version: 16.1.6 (Turbopack)


6. ## Error Type
Console Error

## Error Message
MISSING_MESSAGE: Could not resolve `CurrentCount` in messages for locale `en`.


    at CurrentCount (src\components\CurrentCount.tsx:9:13)
    at resolveErrorDev (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1895:106)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1448:28)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1562:50)
    at Object.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at getOutlinedModel (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1386:17)
    at parseModelString (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1616:50)
    at Array.<anonymous> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2487:55)
    at JSON.parse (<anonymous>:null:null)
    at initializeModelChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:1065:30)
    at resolveConsoleEntry (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2021:96)
    at processFullStringRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2422:17)
    at processFullBinaryRow (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2362:9)
    at processBinaryChunk (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2471:221)
    at progress (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-server-dom-turbopack_9212ccad._.js:2641:13)
    at Counter (src\app\[locale]\(marketing)\counter\page.tsx:31:9)

## Code Frame
   7 |
   8 | export const CurrentCount = async () => {
>  9 |   const t = await getTranslations('CurrentCount');
     |             ^
  10 |
  11 |   // `x-e2e-random-id` is used for end-to-end testing to make isolated requests
  12 |   // The default value is 0 when there is no `x-e2e-random-id` header

Next.js version: 16.1.6 (Turbopack)


7.  ## Error Type
Console Error

## Error Message
MISSING_MESSAGE: Could not resolve `CounterForm` in messages for locale `en`.


    at getMessagesOrError (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_28a846b8._.js:480:27)
    at createBaseTranslator (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_28a846b8._.js:485:29)
    at useTranslationsImpl.useMemo[translate] (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_28a846b8._.js:1000:253)
    at mountMemo (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:5425:25)
    at Object.useMemo (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:15004:24)
    at exports.useMemo (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_04fc3d3b._.js:1743:36)
    at useTranslationsImpl (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_28a846b8._.js:999:196)
    at useTranslations (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_28a846b8._.js:1038:12)
    at <unknown> (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_c2df3a8e._.js:6254:20)
    at CounterForm (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/src_c953b090._.js:42:224)
    at Object.react_stack_bottom_frame (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:14827:24)
    at renderWithHooks (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:4652:24)
    at updateFunctionComponent (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:6113:21)
    at beginWork (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:6688:639)
    at runWithFiberInDEV (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:966:74)
    at performUnitOfWork (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:9563:97)
    at workLoopConcurrentByScheduler (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:9559:58)
    at renderRootConcurrent (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:9542:71)
    at performWorkOnRoot (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:9069:150)
    at performWorkOnRootViaSchedulerTask (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js:10231:9)
    at MessagePort.performWorkUntilDeadline (file://D:/IXARTZ-MANZILTAK(frontend)/ManzilTak-frontend/.next/dev/static/chunks/node_modules_next_dist_compiled_04fc3d3b._.js:3290:64)
    at Counter (src\app\[locale]\(marketing)\counter\page.tsx:28:7)

## Code Frame
  26 |   return (
  27 |     <>
> 28 |       <CounterForm />
     |       ^
  29 |
  30 |       <div className="mt-3">
  31 |         <CurrentCount />

Next.js version: 16.1.6 (Turbopack)
