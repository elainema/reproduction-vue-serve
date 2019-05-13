const api_host = process.env.NODE_ENV !== 'production' ? '//172.30.10.213:7351' : '//api.yeahmobi.com'
const app_name = 'newymapi'

export default {
    api_host,
    app_name,
    api_path: `${api_host}/${app_name}/`,
    swfupload: {
        upload_url: {
            uploadLogo: `${api_host}/${app_name}/Upload/uploadLogo`,
            uploadProductIcon: `${api_host}/${app_name}/Offer/uploadProductIcon`,
            uploadFile: `${api_host}/${app_name}/Upload/uploadFile`,
            uploadIOFile: `${api_host}/${app_name}/Upload/uploadIOFile`,
            uploadCompanyLogo: `${api_host}/${app_name}/Upload/uploadCompanyLogo`,
            simpleUploadFile: `${api_host}/${app_name}/Upload/SimpleUploadFile"`,
            uploadCertificate: `${api_host}/${app_name}/Upload/uploadCertificate`
        },
        flash_url: 'asset/js/swfupload/swfupload.swf'
    },
    defaultSrc:'http://uploads.yeahmobi.com/',
    defaultImg:'../../../asset/image/default_offer_image.png',
    ajax_loader_img:'../../../asset/image/ajax_loader.gif',
    defaultBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAYAAACqNX6+AAACf0lEQVR4Xu2avWsCQRDF90BBEcVC1FbERrQSUfz3rbQQxUKsRUvFQgS/kszCHJvjbhMCeg/ztkpcnXv3fr6ZPZJgv99/GC4YBwICgWFhhRAIFg8CAeNBIASC5gCYHs4QAgFzAEwOE0IgYA6AyWFCCATMATA5TAiBgDkAJocJIRAwB8DkMCEEAuYAmBwmhEDAHACTk0pCHo+HmUwm5nQ6WTuKxaIZDAahNV9/Vjbz+dzI+2Q1Gg3TbDbtz749n7ez2cx+VlcQBGY0Gpl8Pv/nms9gmQqQqKkukNvtZsbjsbnf79/ut9PpmEqlkrhXr9e9/iQByWazf675NkD0RhRMoVAIE7LZbMx6vQ5To0bWajVTLpcT967Xq/2mK1ytk8vlbO3lcmkOh0OYCtXgu163232G596aqSTEB2S1Wpntdhu2KdewUqmUuNfr9cJvervdtuCk5WlbiiZE26Dvem4bfRUZOCBqnLQoaUNuiqS9yO9xe2KewlPz3NkTBSLvkTq73c5b81UgwtmW5v9lxbUsNU7NdBOiQOL2BIh7WNBWJZ+JLvcax+PRAkmq+e+BaAvRWeDOkEwmY1tW3J70+2hCZO7I63JQWCwWRtqaLBfI5XLx1vwXQJJOUmJ0q9X6duQVQ/SIej6fE/f0tCQpGQ6HZjqdhjMk7iT1m5pyJH71SmWG+IDEzQKdGWJONAWyV61Ww+caTYUmTVpXv9+3qdDnHvcZJKnmT8foZ4FKBcizbuYd6hIIGEUCIRAwB8DkMCEEAuYAmBwmhEDAHACTw4QQCJgDYHKYEAIBcwBMDhNCIGAOgMlhQggEzAEwOUwIgYA5ACaHCSEQMAfA5DAhYEA+AS0of5Pt6u4HAAAAAElFTkSuQmCC',
    defaultProductInfoImg:'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
    report_export: api_host,
    parseOfferLogo(src) {
        if (src === config.defaultSrc) {
            return config.defaultImg
        } else return src
    },
}
