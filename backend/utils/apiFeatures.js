class APIFeatures {
    constructor(query,queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex:this.queryStr.keyword, // match regex in name
                $options:'i' // case insensitive
            }
        }:{}

        console.log(keyword)
        // search the keyword returned above
        this.query = this.query.find({ ...keyword })
        return this
    }
}

module.exports = APIFeatures;