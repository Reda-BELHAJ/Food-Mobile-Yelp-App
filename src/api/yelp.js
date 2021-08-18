import axios from "axios";

const YELP_CLIENT_ID = '1a6j57aELpGxqsjq-EsrEw'
const YELP_API_KEY = 'vr_RKVkr-zL58VSN7SacAQ1ykSXkfYSw2P82hiMQLzqrRI7uBszpiqtV9556U3alYwvCmJgzevi-lWS1mHLbcakdiUDh4tlV_E9J4aiJuxxFSQWkZu0JIAyc-c4bYXYx'

export default axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
    headers: {
        Authorization: 'Bearer ' + YELP_API_KEY
    }
});