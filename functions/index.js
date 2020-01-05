const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
const algoliasearch = require('algoliasearch')
const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key
const ALGOLIA_INDEX_NAME = 'cards'
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)
const index = client.initIndex(ALGOLIA_INDEX_NAME)
// コレクションに新規レコードが追加されると起動
exports.onCardCreated = functions.firestore.document('cards/{id}').onCreate((snap, context) => {
  // 新規レコードの情報をIndex用オブジェクトに格納
  const data = snap.data()
  // objectIDをIndexするオブジェクトに追加する
  data.objectID = context.params.id
  // AlgoliaへIndex
  return index.saveObject(data)
})
// algolia全文検索API利用関数// コレクションのレコードが削除されると起動
exports.onCardDeleted = functions.firestore
  .document('cards/{id}')
  .onDelete((snap, context) => {
    // Index用オブジェクトを削除
    index.deleteObject(snap.id)
  })


// algolia全文検索API利用関数// コレクションのレコードが更新されると起動
exports.onCardUpdated = functions.firestore
  .document('cards/{id}')
  .onUpdate((change, context) => {
    // 更新レコードの情報をIndex用オブジェクトに格納
    const objectID = change.after.id
    const newData = change.after.data();
    // AlgoliaへIndex
    return index.saveObject({
      objectID,
      ...newData
    })
  });