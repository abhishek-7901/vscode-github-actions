import {Octokit} from "@octokit/rest";
import {version} from "../../package.json";
import {getGitHubApiUri} from "../configuration/configuration";

import {fetch as undiciFetch, ProxyAgent} from "undici" ; 


export const userAgent = `VS Code GitHub Actions (${version})`;




export function getClient(token: string): Octokit {
  const proxyUrl = `${process.env.HTTP_PROXY}$`; 

  console.log("proxy url is" + proxyUrl) ; 

  const customFetchFunction = (url: string, options: any) => {
    return undiciFetch(url, {
      ...options, 
      dispatcher: new ProxyAgent(proxyUrl),  
    });
  }; 

  return new Octokit({
    auth: token,
    userAgent: userAgent,
    baseUrl: getGitHubApiUri(),
    fetch : customFetchFunction
  });
}
