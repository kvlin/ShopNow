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

        //console.log(keyword)
        // search the keyword returned above
        this.query = this.query.find({ ...keyword })
        return this   
    }

    filter () {
        const queryCopy = { ...this.queryStr };
        
        console.log(queryCopy)
        
        // Removing fields from the query, as these are not defined fields
        // on the schema such as 'names', 'price' 'amount'
        const removeFields = ['keyword', 'limit', 'page']

        removeFields.forEach(el=> delete queryCopy[el])
        //console.log(queryCopy)
        
        // Advance filter for price, ratings (to set up a range rather than matching number)
        let queryStr = JSON.stringify(queryCopy)
        // search for below regex and add $ in front of each (so mongoose can interpret)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}` )
        console.log(queryStr)
        // update the query to be returned
        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }
    
    pagination(resPerPage) {
        // current page number passed from the query
        const currentPage = Number(this.queryStr.page) || 1;

        // Number of items to skip while navigating pages
        const skip = resPerPage * (currentPage - 1);

        // Limit the items returns as per the pagination set
        this.query = this.query.limit(resPerPage).skip(skip)
        
        return this
    }
}

module.exports = APIFeatures;