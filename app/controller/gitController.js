const axios = require('axios');

exports.getRepoDetails = async (req,res) =>{
    let basicInfo = {};
    try{
        let repo = req.params.repo;
        let user = req.params.user;
        let api = `https://api.github.com/repos/${user}/${repo}?&client_id=096b9ffd257381e2cd8c&client_secret=d969acb07b7e82b0b1b2d468c44359aa439e63aa`;
        let githubResponse = await axios(api);
        let basicData = githubResponse.data;
        basicInfo.repo = basicData.name;
        basicInfo.description = basicData.description;
        basicInfo.owner = basicData.owner.login;
        basicInfo.ownerProfile = basicData.owner.html_url;
        let last24 = 0, last7 = 0, more7 = 0;
        let date = new Date();
        let last24time = new Date(Date.now()-24*60*60*1000);
        last24time = last24time.toISOString();
        let last7time = new Date((Date.now()-24*60*60*1000)-(24*60*60*7*1000));
        last7time = last7time.toISOString();
        let dumpAPI = `https://api.github.com/repos/${user}/${repo}`;
        for(let i=0;i<3;i++){
            if(i==0){
                let issue24 = await axios(dumpAPI+'/issues?state=open&since='+last24time+'&client_id=096b9ffd257381e2cd8c&client_secret=d969acb07b7e82b0b1b2d468c44359aa439e63aa');
                last24 = issue24.data.length;
            }
            if(i==1){
                let issue7 = await axios(dumpAPI+'/issues?state=open&since='+last7time+'&client_id=096b9ffd257381e2cd8c&client_secret=d969acb07b7e82b0b1b2d468c44359aa439e63aa');
                last7 = issue7.data.length;
            }
            if(i==2){
                let issue7m = await axios(dumpAPI+'/issues?state=open&client_id=096b9ffd257381e2cd8c&client_secret=d969acb07b7e82b0b1b2d468c44359aa439e63aa');
                more7 = issue7m.data.length;
            }
        }
        basicInfo.last24 = last24;
        basicInfo.last24to7 = last7;
        basicInfo.over7 = more7; 
        res.status(200).send(basicInfo);
    } catch(e){
        res.status(200).send(basicInfo);
    }
    
}