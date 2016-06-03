var TileMenu;
(function (TileMenu) {
    var AddInInfo = (function () {
        function AddInInfo(url) {
            // this will be the path of your url https://localhost..... This is set in the home controller
            this.AddInUrl = url;
            // use the app url to load a css file into sharepoint
            TileMenu.Utils.loadCss(this.AddInUrl + "/Content/Tiles.css");
        }
        return AddInInfo;
    }());
    TileMenu.AddInInfo = AddInInfo;
})(TileMenu || (TileMenu = {}));
var TileMenu;
(function (TileMenu) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getJSON = function (url) {
            var prom = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', url);
                request.setRequestHeader("Accept", "application/json");
                request.send();
                request.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.response);
                    }
                    else {
                        // Performs the function "reject" when this.status is different than 2xx
                        reject(this.statusText);
                    }
                };
                request.onerror = function () {
                    reject(this.statusText);
                };
            });
            return prom;
        };
        Utils.postJSON = function (url, data) {
            var prom = new Promise(function (resolve, reject) {
                console.log("gonna post");
                var request = new XMLHttpRequest();
                request.open('POST', url);
                request.setRequestHeader("X-RequestDigest", document.getElementById("__REQUESTDIGEST").getAttribute("value"));
                request.setRequestHeader("Accept", "application/json");
                request.setRequestHeader("content-type", "application/json;odata=verbose");
                request.send(JSON.stringify(data));
                request.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.response);
                    }
                    else {
                        // Performs the function "reject" when this.status is different than 2xx
                        console.log(JSON.parse(this.response));
                        reject(this.response);
                    }
                };
                request.onerror = function () {
                    console.log(JSON.stringify(this.response));
                    reject(this.response);
                };
            });
            return prom;
        };
        Utils.loadScript = function (url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            }
            else {
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        // loads a css file into the head based on its path
        Utils.loadCss = function (path) {
            var head = document.getElementsByTagName("head");
            var e = document.createElement("link");
            head[0].appendChild(e);
            e.setAttribute("type", "text/css");
            e.setAttribute("rel", "stylesheet");
            e.setAttribute("href", path);
        };
        return Utils;
    }());
    TileMenu.Utils = Utils;
})(TileMenu || (TileMenu = {}));
var TileMenu;
(function (TileMenu) {
    var Tile = (function () {
        function Tile(title, url, image, color) {
            this.Title = title;
            this.URL = url;
            this.Image = image;
            this.Color = color;
        }
        Tile.prototype.GetTileElement = function () {
            var divElement = document.createElement("div");
            divElement.setAttribute("class", "tile-container");
            divElement.setAttribute("style", "background-color:" + this.Color);
            divElement.setAttribute("onclick", "window.location = " + this.URL);
            divElement.innerHTML =
                "<img src='" + this.Image + "' />" +
                    "<div>" + this.Title + "</div>";
            return divElement;
        };
        return Tile;
    }());
    TileMenu.Tile = Tile;
})(TileMenu || (TileMenu = {}));
var TileMenu;
(function (TileMenu) {
    var TileApp = (function () {
        function TileApp() {
        }
        TileApp.Init = function () {
            document.getElementById("Tiles").innerText = "Hello Tiles";
            // Utils.loadScript(_TileInfo.AddInUrl + "/scripts/es6-promise.min.js", function () {
            TileApp.CreateTilesListIfNotExists();
            // });
        };
        TileApp.CreateTilesListIfNotExists = function () {
            SP.SOD.executeOrDelayUntilScriptLoaded(function () {
                var ctx = SP.ClientContext.get_current();
                // get list needs the relative url to get the list. 
                var list = ctx.get_web().getList("/sites/Tiles/SitePages");
                ctx.load(list);
                ctx.executeQueryAsync(function (sender, args) {
                    console.log(list);
                }, function (sender, args) {
                    console.log(sender);
                    console.log(args);
                });
            }, "sp.js");
        };
        return TileApp;
    }());
    TileMenu.TileApp = TileApp;
})(TileMenu || (TileMenu = {}));
//# sourceMappingURL=Tiles.js.map