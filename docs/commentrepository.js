var commentrepository =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "UserRepository", function() { return /* binding */ repository_UserRepository; });
__webpack_require__.d(__webpack_exports__, "EmoteRepository", function() { return /* binding */ repository_EmoteRepository; });
__webpack_require__.d(__webpack_exports__, "CommentRepository", function() { return /* binding */ repository_CommentRepository; });

// CONCATENATED MODULE: ./src/timeutil.ts
function toTimeString(seconds) {
    const hour = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minutes.toString().padStart(2, '0');
    const secondStr = seconds.toString().padStart(2, '0');
    return `${hourStr}:${minuteStr}:${secondStr}`;
}
function groupCountsByTime(times, timeSize) {
    const counts = [];
    let currentMax = 0;
    for (const time of times) {
        while (currentMax < time) {
            counts.push(0);
            currentMax += timeSize;
        }
        const lastIndex = counts.length - 1;
        counts[lastIndex]++;
    }
    return counts;
}

// CONCATENATED MODULE: ./src/models.ts

class User {
    static parseUser(data) {
        const user = new User();
        user.id = Number(data._id);
        user.username = data.name;
        user.displayName = data.display_name;
        user.createdTime = new Date(data.created_at).getTime() / 1000.0;
        user.type = data.type;
        return user;
    }
    // Display string of the Twitch user. Same format as in official Twitch chat html
    getDisplayString() {
        if (this.displayName.toLowerCase() === this.username.toLowerCase()) {
            return this.displayName;
        }
        return `${this.displayName}(${this.username})`;
    }
}
class Emote {
    static parseEmote(data) {
        if (!data.emoticon) {
            return null;
        }
        const emoteData = data.emoticon;
        const emote = new Emote();
        emote.id = parseInt(emoteData.emoticon_id);
        emote.name = data.text;
        emote.emoteSetId = emoteData.emoticon_set_id;
        return emote;
    }
    getImageUrl() {
        // As of July 2020, this address format is up-to-date
        return `https://static-cdn.jtvnw.net/emoticons/v1/${this.id}/1.0`;
    }
}
class models_Comment {
    toDisplayString() {
        const timeStr = toTimeString(this.relativeTime);
        return `[${timeStr}] (${this.user.displayName}): ${this.rawText}`;
    }
    static parseComment(data) {
        var _a, _b, _c, _d;
        const comment = new models_Comment();
        comment.id = data._id;
        comment.channel = Number(data.channel_id);
        comment.relativeTime = data.content_offset_seconds;
        comment.absoluteTime = new Date(data.created_at).getTime() / 1000.0;
        const message = data.message;
        comment.bits = (_a = message.bits_spent) !== null && _a !== void 0 ? _a : 0;
        comment.rawText = (_b = message.body) !== null && _b !== void 0 ? _b : ""; // Raw text
        comment.fragments = (_c = message.fragments) !== null && _c !== void 0 ? _c : [];
        comment.user = User.parseUser(data.commenter);
        comment.badges = (_d = message.user_badges) !== null && _d !== void 0 ? _d : [];
        // Build emotes and text contents
        comment.emotes = [];
        const textFragments = [];
        comment.contentLength = 0;
        for (let fragmentData of comment.fragments) {
            if (fragmentData.emoticon) { // Emote fragment
                const emote = Emote.parseEmote(fragmentData);
                comment.emotes.push(emote);
                comment.contentLength += 1; // For now, emotes are assumed to have content length 1
            }
            else { // Text fragment
                const text = fragmentData.text;
                textFragments.push(text.trim());
                comment.contentLength += text.length;
            }
        }
        // Reduce all spaces between text fragments to just one space, for ease of search and filter
        // TODO: Is this the right way?
        comment.contentText = textFragments.join(" ");
        return comment;
    }
}

// CONCATENATED MODULE: ./src/counter.ts
function biggerCountFn(kc1, kc2) {
    if (kc1.count !== kc2.count) {
        // Item with more count comes first
        return kc1.count > kc2.count ? -1 : 1;
    }
    if (kc1.key !== kc2.key) {
        return kc1.key < kc2.key ? -1 : 1;
    }
    return 0;
}
class Counter {
    constructor() {
        this.map = new Map();
    }
    get(key) {
        var _a;
        const value = (_a = this.map.get(key)) !== null && _a !== void 0 ? _a : 0;
        return value;
    }
    // TODO: This can be optimized with priority queue
    // when topCount is significantly smaller than map size
    getTopKeys(topCount = 0) {
        const arr = [];
        for (const [key, count] of this.map) {
            arr.push({ key, count });
        }
        arr.sort(biggerCountFn);
        if (0 < topCount && topCount < arr.length) {
            return arr.slice(0, topCount);
        }
        return arr;
    }
    increment(key) {
        this.change(key, 1);
    }
    change(key, delta) {
        const value = this.get(key);
        this.map.set(key, value + delta);
    }
}

// CONCATENATED MODULE: ./src/repository.ts



class repository_UserRepository {
    constructor() {
        this.userById = new Map();
        this.chatCounter = new Counter();
    }
    addChatter(user) {
        this.userById.set(user.id, user);
        this.chatCounter.increment(user.id);
    }
    getById(id) {
        return this.userById.get(id);
    }
    // Get users with most chats, tie-breaking with user ID
    getTopChatters(topCount = 0) {
        const keysWithCount = this.chatCounter.getTopKeys(topCount);
        return keysWithCount.map((kc) => ({
            user: this.userById.get(kc.key),
            count: kc.count
        }));
    }
    getUserCount() {
        return this.userById.size;
    }
}
class repository_EmoteRepository {
    constructor() {
        this.emoteById = new Map();
        this.emoteByName = new Map();
        this.totalCounter = new Counter();
    }
    getById(id) {
        return this.emoteById.get(id);
    }
    getByName(name) {
        return this.emoteByName.get(name);
    }
    getCount(id) {
        return this.totalCounter.get(id);
    }
    // Get most used {topCount} emotes, tie-breaking with emote ID.
    getTopEmotes(topCount = 0) {
        const keysWithCount = this.totalCounter.getTopKeys(topCount);
        return keysWithCount.map((kc) => ({
            emote: this.emoteById.get(kc.key),
            count: kc.count
        }));
    }
    // Add list of emotes from the same chat
    addChatEmotes(emotes) {
        for (let emote of emotes) {
            this.totalCounter.increment(emote.id);
            const alreadySeen = this.emoteById.has(emote.id);
            if (!alreadySeen) {
                this.emoteById.set(emote.id, emote);
                this.emoteByName.set(emote.name, emote);
            }
        }
    }
}
class repository_CommentRepository {
    constructor(comments) {
        this.userRepository = new repository_UserRepository();
        this.emoteRepository = new repository_EmoteRepository();
        this.commentList = [];
        for (const comment of comments) {
            this.addComment(comment);
        }
        // Just in case the commentList is not sorted by time
        this.commentList.sort(commentCompareFn);
    }
    addComment(comment) {
        this.userRepository.addChatter(comment.user);
        this.emoteRepository.addChatEmotes(comment.emotes);
        this.commentList.push(comment);
    }
    getUserCount() {
        return this.userRepository.getUserCount();
    }
    getCommentCount() {
        return this.commentList.length;
    }
    getTopEmotes(topCount = 0) {
        return this.emoteRepository.getTopEmotes(topCount);
    }
    getTopChatters(topCount = 0) {
        return this.userRepository.getTopChatters(topCount);
    }
    getComments() {
        return this.commentList;
    }
    getTotalBits() {
        return this.commentList.reduce((prev, curr) => prev + curr.bits, 0);
    }
    filter(ft) {
        return this.commentList.filter((comment) => ft.eval(comment));
    }
    // TODO: The current code has a bug that doesn't show empty counts
    // Between the last chat and till the stream ends. To fix this, we need
    // a second parameter (max time)
    getCountsByRelativeTime(timeSize) {
        const times = this.commentList.map((comment) => comment.relativeTime);
        const counts = groupCountsByTime(times, timeSize);
        return counts;
    }
    static fromCommentsData(commentsData) {
        const comments = commentsData.map(models_Comment.parseComment);
        return new repository_CommentRepository(comments);
    }
}
function commentCompareFn(a, b) {
    const aTime = a.relativeTime, bTime = b.relativeTime;
    if (aTime < bTime) {
        return -1;
    }
    if (aTime > bTime) {
        return 1;
    }
    // If two comments are posted at the same time, compare by id for tie-breaking.
    // Very unlikely because the relative times are in miliseconds
    return a.id.localeCompare(b.id);
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21tZW50cmVwb3NpdG9yeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb21tZW50cmVwb3NpdG9yeS8uL3NyYy90aW1ldXRpbC50cyIsIndlYnBhY2s6Ly9jb21tZW50cmVwb3NpdG9yeS8uL3NyYy9tb2RlbHMudHMiLCJ3ZWJwYWNrOi8vY29tbWVudHJlcG9zaXRvcnkvLi9zcmMvY291bnRlci50cyIsIndlYnBhY2s6Ly9jb21tZW50cmVwb3NpdG9yeS8uL3NyYy9yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRU8sU0FBUyxZQUFZLENBQUMsT0FBZTtJQUN4QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN0QyxPQUFPLEdBQUcsT0FB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QU8sSUFBSSw0QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFHRCxTQUFTLGdCQUFnQixDQUFDLENBQVUsRUFBRSxDQUFVO0lBQzVDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDckQsSUFBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNiO0lBQ0QsSUFBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLENBQUM7S0FDWjtJQUNELCtFQUErRTtJQUMvRSw4REFBOEQ7SUFDOUQsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEMsQ0FBQyIsImZpbGUiOiJjb21tZW50cmVwb3NpdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCB7IGNvdW50UmVzZXQgfSBmcm9tIFwiY29uc29sZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b1RpbWVTdHJpbmcoc2Vjb25kczogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBob3VyID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xyXG4gICAgc2Vjb25kcyA9IHNlY29uZHMgJSA2MDtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICBzZWNvbmRzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApO1xyXG5cclxuICAgIGNvbnN0IGhvdXJTdHIgPSBob3VyLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIGNvbnN0IG1pbnV0ZVN0ciA9IG1pbnV0ZXMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgY29uc3Qgc2Vjb25kU3RyID0gc2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICByZXR1cm4gYCR7aG91clN0cn06JHttaW51dGVTdHJ9OiR7c2Vjb25kU3RyfWA7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBDb3VudHNCeVRpbWUodGltZXM6IG51bWJlcltdLCB0aW1lU2l6ZTogbnVtYmVyKSA6IG51bWJlcltdIHtcclxuICAgIGNvbnN0IGNvdW50cyA9IFtdO1xyXG4gICAgbGV0IGN1cnJlbnRNYXggPSAwO1xyXG4gICAgZm9yKGNvbnN0IHRpbWUgb2YgdGltZXMpIHtcclxuICAgICAgICB3aGlsZShjdXJyZW50TWF4IDwgdGltZSkge1xyXG4gICAgICAgICAgICBjb3VudHMucHVzaCgwKTtcclxuICAgICAgICAgICAgY3VycmVudE1heCArPSB0aW1lU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gY291bnRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgY291bnRzW2xhc3RJbmRleF0rKztcclxuICAgIH1cclxuICAgIHJldHVybiBjb3VudHM7XHJcbn0iLCJpbXBvcnQgeyBGcmFnbWVudERhdGEsIEVtb3RlUmFuZ2VEYXRhLCBDb21tZW50ZXJEYXRhLCBDb21tZW50RGF0YSwgVXNlckJhZGdlRGF0YSB9IGZyb20gXCIuL2RhdGFfbW9kZWxzXCI7XHJcbmltcG9ydCB7IHRvVGltZVN0cmluZyB9IGZyb20gXCIuL3RpbWV1dGlsXCI7XHJcbmltcG9ydCB7IENvbW1lbnRSZXBvc2l0b3J5IH0gZnJvbSBcIi4vcmVwb3NpdG9yeVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyIHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgZGlzcGxheU5hbWU6IHN0cmluZztcclxuICAgIGNyZWF0ZWRUaW1lOiBudW1iZXI7ICAvLyBlcG9jaCB0aW1lIHNlY29uZHNcclxuICAgIHR5cGU6IHN0cmluZztcclxuXHJcbiAgICBzdGF0aWMgcGFyc2VVc2VyKGRhdGE6IENvbW1lbnRlckRhdGEpIDogVXNlciB7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKCk7XHJcbiAgICAgICAgdXNlci5pZCA9IE51bWJlcihkYXRhLl9pZCk7XHJcbiAgICAgICAgdXNlci51c2VybmFtZSA9IGRhdGEubmFtZTtcclxuICAgICAgICB1c2VyLmRpc3BsYXlOYW1lID0gZGF0YS5kaXNwbGF5X25hbWU7XHJcbiAgICAgICAgdXNlci5jcmVhdGVkVGltZSA9IG5ldyBEYXRlKGRhdGEuY3JlYXRlZF9hdCkuZ2V0VGltZSgpIC8gMTAwMC4wO1xyXG4gICAgICAgIHVzZXIudHlwZSA9IGRhdGEudHlwZTtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiB1c2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc3BsYXkgc3RyaW5nIG9mIHRoZSBUd2l0Y2ggdXNlci4gU2FtZSBmb3JtYXQgYXMgaW4gb2ZmaWNpYWwgVHdpdGNoIGNoYXQgaHRtbFxyXG4gICAgZ2V0RGlzcGxheVN0cmluZygpIDogc3RyaW5nIHtcclxuICAgICAgICBpZih0aGlzLmRpc3BsYXlOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMudXNlcm5hbWUudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5TmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZGlzcGxheU5hbWV9KCR7dGhpcy51c2VybmFtZX0pYDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBFbW90ZSB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZW1vdGVTZXRJZDogc3RyaW5nOyAgLy8gY2FuIGJlIGVtcHR5IHN0cmluZ1xyXG5cclxuICAgIHN0YXRpYyBwYXJzZUVtb3RlKGRhdGE6IEZyYWdtZW50RGF0YSkgOiBFbW90ZSB7XHJcbiAgICAgICAgaWYoIWRhdGEuZW1vdGljb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVtb3RlRGF0YSA9IGRhdGEuZW1vdGljb247XHJcbiAgICAgICAgY29uc3QgZW1vdGUgPSBuZXcgRW1vdGUoKTtcclxuICAgICAgICBlbW90ZS5pZCA9IHBhcnNlSW50KGVtb3RlRGF0YS5lbW90aWNvbl9pZCk7XHJcbiAgICAgICAgZW1vdGUubmFtZSA9IGRhdGEudGV4dDtcclxuICAgICAgICBlbW90ZS5lbW90ZVNldElkID0gZW1vdGVEYXRhLmVtb3RpY29uX3NldF9pZDtcclxuICAgICAgICByZXR1cm4gZW1vdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW1hZ2VVcmwoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gQXMgb2YgSnVseSAyMDIwLCB0aGlzIGFkZHJlc3MgZm9ybWF0IGlzIHVwLXRvLWRhdGVcclxuICAgICAgICByZXR1cm4gYGh0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyR7dGhpcy5pZH0vMS4wYDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21tZW50IHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBjaGFubmVsOiBudW1iZXI7XHJcbiAgICByZWxhdGl2ZVRpbWU6IG51bWJlcjsgIC8vIFJlbGF0aXZlIHRpbWUgaW4gc2Vjb25kcyBmcm9tIHZpZGVvIHN0YXJ0XHJcbiAgICBhYnNvbHV0ZVRpbWU6IG51bWJlcjsgIC8vIGVwb2NoIHRpbWUgc2Vjb25kcyAgIFxyXG4gICAgXHJcbiAgICBiaXRzOiBudW1iZXI7XHJcbiAgICByYXdUZXh0OiBzdHJpbmc7ICAvLyBSYXcgdGV4dCB3aGVyZSBhbGwgZW1vdGVzIGFyZSBzdG9yZWQgYXMgdGV4dHhcclxuICAgIGNvbnRlbnRUZXh0OiBzdHJpbmc7ICAvLyBQdXJlIHRleHQgd2l0aG91dCBlbW90ZXNcclxuICAgIGNvbnRlbnRMZW5ndGg6IG51bWJlciAgLy8gTGVuZ3RoIG9mIGNoYXQgY29udGVudCwgd2hlcmUgZWFjaCBlbW90ZSBoYXMgbGVuZ3RoIDFcclxuICAgIHVzZXI6IFVzZXI7XHJcbiAgICBmcmFnbWVudHM6IEZyYWdtZW50RGF0YVtdO1xyXG4gICAgZW1vdGVzOiBFbW90ZVtdOyAgLy8gTGlzdCBvZiBlbW90ZXMgdXNlZCBpbiB0aGUgY29tbWVudFxyXG4gICAgYmFkZ2VzOiBVc2VyQmFkZ2VEYXRhW107XHJcblxyXG4gICAgdG9EaXNwbGF5U3RyaW5nKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHRpbWVTdHIgPSB0b1RpbWVTdHJpbmcodGhpcy5yZWxhdGl2ZVRpbWUpO1xyXG4gICAgICAgIHJldHVybiBgWyR7dGltZVN0cn1dICgke3RoaXMudXNlci5kaXNwbGF5TmFtZX0pOiAke3RoaXMucmF3VGV4dH1gO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwYXJzZUNvbW1lbnQoZGF0YTogQ29tbWVudERhdGEpIDogQ29tbWVudCB7XHJcbiAgICAgICAgY29uc3QgY29tbWVudCA9IG5ldyBDb21tZW50KCk7XHJcbiAgICAgICAgY29tbWVudC5pZCA9IGRhdGEuX2lkO1xyXG4gICAgICAgIGNvbW1lbnQuY2hhbm5lbCA9IE51bWJlcihkYXRhLmNoYW5uZWxfaWQpO1xyXG4gICAgICAgIGNvbW1lbnQucmVsYXRpdmVUaW1lID0gZGF0YS5jb250ZW50X29mZnNldF9zZWNvbmRzO1xyXG4gICAgICAgIGNvbW1lbnQuYWJzb2x1dGVUaW1lID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KS5nZXRUaW1lKCkgLyAxMDAwLjA7XHJcblxyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLm1lc3NhZ2U7XHJcbiAgICAgICAgY29tbWVudC5iaXRzID0gbWVzc2FnZS5iaXRzX3NwZW50ID8/IDA7XHJcbiAgICAgICAgY29tbWVudC5yYXdUZXh0ID0gbWVzc2FnZS5ib2R5ID8/IFwiXCI7ICAvLyBSYXcgdGV4dFxyXG4gICAgICAgIGNvbW1lbnQuZnJhZ21lbnRzID0gbWVzc2FnZS5mcmFnbWVudHMgPz8gW107XHJcbiAgICAgICAgY29tbWVudC51c2VyID0gVXNlci5wYXJzZVVzZXIoZGF0YS5jb21tZW50ZXIpO1xyXG4gICAgICAgIGNvbW1lbnQuYmFkZ2VzID0gbWVzc2FnZS51c2VyX2JhZGdlcyA/PyBbXTtcclxuXHJcbiAgICAgICAgLy8gQnVpbGQgZW1vdGVzIGFuZCB0ZXh0IGNvbnRlbnRzXHJcbiAgICAgICAgY29tbWVudC5lbW90ZXMgPSBbXTtcclxuICAgICAgICBjb25zdCB0ZXh0RnJhZ21lbnRzIDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBjb21tZW50LmNvbnRlbnRMZW5ndGggPSAwO1xyXG4gICAgICAgIGZvcihsZXQgZnJhZ21lbnREYXRhIG9mIGNvbW1lbnQuZnJhZ21lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmKGZyYWdtZW50RGF0YS5lbW90aWNvbikgeyAgLy8gRW1vdGUgZnJhZ21lbnRcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVtb3RlID0gRW1vdGUucGFyc2VFbW90ZShmcmFnbWVudERhdGEpO1xyXG4gICAgICAgICAgICAgICAgY29tbWVudC5lbW90ZXMucHVzaChlbW90ZSk7XHJcbiAgICAgICAgICAgICAgICBjb21tZW50LmNvbnRlbnRMZW5ndGggKz0gMTsgIC8vIEZvciBub3csIGVtb3RlcyBhcmUgYXNzdW1lZCB0byBoYXZlIGNvbnRlbnQgbGVuZ3RoIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgIC8vIFRleHQgZnJhZ21lbnRcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHQgPSBmcmFnbWVudERhdGEudGV4dDtcclxuICAgICAgICAgICAgICAgIHRleHRGcmFnbWVudHMucHVzaCh0ZXh0LnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICBjb21tZW50LmNvbnRlbnRMZW5ndGggKz0gdGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVkdWNlIGFsbCBzcGFjZXMgYmV0d2VlbiB0ZXh0IGZyYWdtZW50cyB0byBqdXN0IG9uZSBzcGFjZSwgZm9yIGVhc2Ugb2Ygc2VhcmNoIGFuZCBmaWx0ZXJcclxuICAgICAgICAvLyBUT0RPOiBJcyB0aGlzIHRoZSByaWdodCB3YXk/XHJcbiAgICAgICAgY29tbWVudC5jb250ZW50VGV4dCA9IHRleHRGcmFnbWVudHMuam9pbihcIiBcIik7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gY29tbWVudDtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgSW50ZWdlckxpc3QgfSBmcm9tIFwiYW50bHI0dHMvbWlzYy9JbnRlZ2VyTGlzdFwiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgS2V5V2l0aENvdW50IHtcclxuICAgIGtleTogbnVtYmVyO1xyXG4gICAgY291bnQ6IG51bWJlcjtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGJpZ2dlckNvdW50Rm4oa2MxOiBLZXlXaXRoQ291bnQsIGtjMjogS2V5V2l0aENvdW50KSA6IG51bWJlciB7XHJcbiAgICBpZihrYzEuY291bnQgIT09IGtjMi5jb3VudCkge1xyXG4gICAgICAgIC8vIEl0ZW0gd2l0aCBtb3JlIGNvdW50IGNvbWVzIGZpcnN0XHJcbiAgICAgICAgcmV0dXJuIGtjMS5jb3VudCA+IGtjMi5jb3VudCA/IC0xIDogMTtcclxuICAgIH1cclxuICAgIGlmKGtjMS5rZXkgIT09IGtjMi5rZXkpIHtcclxuICAgICAgICByZXR1cm4ga2MxLmtleSA8IGtjMi5rZXkgPyAtMSA6IDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDb3VudGVyIHtcclxuICAgIHJlYWRvbmx5IG1hcDogTWFwPG51bWJlciwgbnVtYmVyPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KGtleTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLm1hcC5nZXQoa2V5KSA/PyAwO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBUaGlzIGNhbiBiZSBvcHRpbWl6ZWQgd2l0aCBwcmlvcml0eSBxdWV1ZVxyXG4gICAgLy8gd2hlbiB0b3BDb3VudCBpcyBzaWduaWZpY2FudGx5IHNtYWxsZXIgdGhhbiBtYXAgc2l6ZVxyXG4gICAgZ2V0VG9wS2V5cyh0b3BDb3VudCA9IDApIDogS2V5V2l0aENvdW50W10ge1xyXG4gICAgICAgIGNvbnN0IGFyciA6IEtleVdpdGhDb3VudFtdID0gW107XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXksIGNvdW50XSBvZiB0aGlzLm1hcCkge1xyXG4gICAgICAgICAgICBhcnIucHVzaCh7a2V5LCBjb3VudH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIuc29ydChiaWdnZXJDb3VudEZuKTtcclxuXHJcbiAgICAgICAgaWYoMCA8IHRvcENvdW50ICYmIHRvcENvdW50IDwgYXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNsaWNlKDAsIHRvcENvdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICBpbmNyZW1lbnQoa2V5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNoYW5nZShrZXksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlKGtleTogbnVtYmVyLCBkZWx0YTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldChrZXkpO1xyXG4gICAgICAgIHRoaXMubWFwLnNldChrZXksIHZhbHVlICsgZGVsdGEpO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCB7IFVzZXIsIENvbW1lbnQsIEVtb3RlIH0gZnJvbSBcIi4vbW9kZWxzXCI7XHJcbmltcG9ydCB7IENvbW1lbnREYXRhIH0gZnJvbSBcIi4vZGF0YV9tb2RlbHNcIjtcclxuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSBcIi4vZmlsdGVyL2ZpbHRlclwiO1xyXG5pbXBvcnQgeyBDb3VudGVyIH0gZnJvbSBcIi4vY291bnRlclwiO1xyXG5pbXBvcnQgeyBncm91cENvdW50c0J5VGltZSB9IGZyb20gXCIuL3RpbWV1dGlsXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVc2VyV2l0aENvdW50IHtcclxuICAgIHVzZXI6IFVzZXIsXHJcbiAgICBjb3VudDogbnVtYmVyLFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJSZXBvc2l0b3J5IHtcclxuICAgIHJlYWRvbmx5IHVzZXJCeUlkOiBNYXA8bnVtYmVyLCBVc2VyPjtcclxuICAgIHJlYWRvbmx5IGNoYXRDb3VudGVyOiBDb3VudGVyOyAgLy8gQ2hhdCBjb3VudCBieSB1c2VyXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudXNlckJ5SWQgPSBuZXcgTWFwPG51bWJlciwgVXNlcj4oKTtcclxuICAgICAgICB0aGlzLmNoYXRDb3VudGVyID0gbmV3IENvdW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDaGF0dGVyKHVzZXI6IFVzZXIpIHtcclxuICAgICAgICB0aGlzLnVzZXJCeUlkLnNldCh1c2VyLmlkLCB1c2VyKTtcclxuICAgICAgICB0aGlzLmNoYXRDb3VudGVyLmluY3JlbWVudCh1c2VyLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VyQnlJZC5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB1c2VycyB3aXRoIG1vc3QgY2hhdHMsIHRpZS1icmVha2luZyB3aXRoIHVzZXIgSURcclxuICAgIGdldFRvcENoYXR0ZXJzKHRvcENvdW50ID0gMCkgOiBVc2VyV2l0aENvdW50W10ge1xyXG4gICAgICAgIGNvbnN0IGtleXNXaXRoQ291bnQgPSB0aGlzLmNoYXRDb3VudGVyLmdldFRvcEtleXModG9wQ291bnQpO1xyXG4gICAgICAgIHJldHVybiBrZXlzV2l0aENvdW50Lm1hcCgoa2MpID0+ICh7XHJcbiAgICAgICAgICAgIHVzZXI6IHRoaXMudXNlckJ5SWQuZ2V0KGtjLmtleSksXHJcbiAgICAgICAgICAgIGNvdW50OiBrYy5jb3VudFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyQ291bnQoKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlckJ5SWQuc2l6ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW1vdGVXaXRoQ291bnQge1xyXG4gICAgZW1vdGU6IEVtb3RlLFxyXG4gICAgY291bnQ6IG51bWJlcixcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBFbW90ZVJlcG9zaXRvcnkge1xyXG4gICAgcmVhZG9ubHkgZW1vdGVCeUlkOiBNYXA8bnVtYmVyLCBFbW90ZT47XHJcbiAgICByZWFkb25seSBlbW90ZUJ5TmFtZTogTWFwPHN0cmluZywgRW1vdGU+O1xyXG4gICAgcmVhZG9ubHkgdG90YWxDb3VudGVyOiBDb3VudGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZW1vdGVCeUlkID0gbmV3IE1hcDxudW1iZXIsIEVtb3RlPigpO1xyXG4gICAgICAgIHRoaXMuZW1vdGVCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgRW1vdGU+KCk7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ZXIgPSBuZXcgQ291bnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ5SWQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtb3RlQnlJZC5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbW90ZUJ5TmFtZS5nZXQobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q291bnQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvdGFsQ291bnRlci5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCBtb3N0IHVzZWQge3RvcENvdW50fSBlbW90ZXMsIHRpZS1icmVha2luZyB3aXRoIGVtb3RlIElELlxyXG4gICAgZ2V0VG9wRW1vdGVzKHRvcENvdW50ID0gMCkgOiBFbW90ZVdpdGhDb3VudFtdIHtcclxuICAgICAgICBjb25zdCBrZXlzV2l0aENvdW50ID0gdGhpcy50b3RhbENvdW50ZXIuZ2V0VG9wS2V5cyh0b3BDb3VudCk7XHJcbiAgICAgICAgcmV0dXJuIGtleXNXaXRoQ291bnQubWFwKChrYykgPT4gKHtcclxuICAgICAgICAgICAgZW1vdGU6IHRoaXMuZW1vdGVCeUlkLmdldChrYy5rZXkpLFxyXG4gICAgICAgICAgICBjb3VudDoga2MuY291bnRcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGxpc3Qgb2YgZW1vdGVzIGZyb20gdGhlIHNhbWUgY2hhdFxyXG4gICAgYWRkQ2hhdEVtb3RlcyhlbW90ZXM6IEVtb3RlW10pIHtcclxuICAgICAgICBmb3IobGV0IGVtb3RlIG9mIGVtb3Rlcykge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsQ291bnRlci5pbmNyZW1lbnQoZW1vdGUuaWQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeVNlZW4gPSB0aGlzLmVtb3RlQnlJZC5oYXMoZW1vdGUuaWQpO1xyXG4gICAgICAgICAgICBpZighYWxyZWFkeVNlZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVCeUlkLnNldChlbW90ZS5pZCwgZW1vdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbW90ZUJ5TmFtZS5zZXQoZW1vdGUubmFtZSwgZW1vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1lbnRSZXBvc2l0b3J5IHtcclxuICAgIHJlYWRvbmx5IHVzZXJSZXBvc2l0b3J5OiBVc2VyUmVwb3NpdG9yeTtcclxuICAgIHJlYWRvbmx5IGVtb3RlUmVwb3NpdG9yeTogRW1vdGVSZXBvc2l0b3J5O1xyXG4gICAgcmVhZG9ubHkgY29tbWVudExpc3Q6IENvbW1lbnRbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21tZW50czogQ29tbWVudFtdKSB7XHJcbiAgICAgICAgdGhpcy51c2VyUmVwb3NpdG9yeSA9IG5ldyBVc2VyUmVwb3NpdG9yeSgpO1xyXG4gICAgICAgIHRoaXMuZW1vdGVSZXBvc2l0b3J5ID0gbmV3IEVtb3RlUmVwb3NpdG9yeSgpO1xyXG4gICAgICAgIHRoaXMuY29tbWVudExpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IGNvbW1lbnQgb2YgY29tbWVudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb21tZW50KGNvbW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSnVzdCBpbiBjYXNlIHRoZSBjb21tZW50TGlzdCBpcyBub3Qgc29ydGVkIGJ5IHRpbWVcclxuICAgICAgICB0aGlzLmNvbW1lbnRMaXN0LnNvcnQoY29tbWVudENvbXBhcmVGbik7XHJcbiAgICB9XHJcbiBcclxuICAgIGFkZENvbW1lbnQoY29tbWVudDogQ29tbWVudCkge1xyXG4gICAgICAgIHRoaXMudXNlclJlcG9zaXRvcnkuYWRkQ2hhdHRlcihjb21tZW50LnVzZXIpO1xyXG4gICAgICAgIHRoaXMuZW1vdGVSZXBvc2l0b3J5LmFkZENoYXRFbW90ZXMoY29tbWVudC5lbW90ZXMpO1xyXG4gICAgICAgIHRoaXMuY29tbWVudExpc3QucHVzaChjb21tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyQ291bnQoKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclJlcG9zaXRvcnkuZ2V0VXNlckNvdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29tbWVudENvdW50KCkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1lbnRMaXN0Lmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3BFbW90ZXModG9wQ291bnQgPSAwKSA6IEVtb3RlV2l0aENvdW50W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtb3RlUmVwb3NpdG9yeS5nZXRUb3BFbW90ZXModG9wQ291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRvcENoYXR0ZXJzKHRvcENvdW50ID0gMCkgOiBVc2VyV2l0aENvdW50W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJSZXBvc2l0b3J5LmdldFRvcENoYXR0ZXJzKHRvcENvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb21tZW50cygpIDogQ29tbWVudFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21tZW50TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3RhbEJpdHMoKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWVudExpc3QucmVkdWNlKChwcmV2LCBjdXJyKSA9PiBwcmV2ICsgY3Vyci5iaXRzLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXIoZnQ6IEZpbHRlcikgOiBDb21tZW50W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1lbnRMaXN0LmZpbHRlcigoY29tbWVudCkgPT4gZnQuZXZhbChjb21tZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogVGhlIGN1cnJlbnQgY29kZSBoYXMgYSBidWcgdGhhdCBkb2Vzbid0IHNob3cgZW1wdHkgY291bnRzXHJcbiAgICAvLyBCZXR3ZWVuIHRoZSBsYXN0IGNoYXQgYW5kIHRpbGwgdGhlIHN0cmVhbSBlbmRzLiBUbyBmaXggdGhpcywgd2UgbmVlZFxyXG4gICAgLy8gYSBzZWNvbmQgcGFyYW1ldGVyIChtYXggdGltZSlcclxuICAgIGdldENvdW50c0J5UmVsYXRpdmVUaW1lKHRpbWVTaXplOiBudW1iZXIpIDogbnVtYmVyW10ge1xyXG4gICAgICAgIGNvbnN0IHRpbWVzID0gdGhpcy5jb21tZW50TGlzdC5tYXAoKGNvbW1lbnQpID0+IGNvbW1lbnQucmVsYXRpdmVUaW1lKTtcclxuICAgICAgICBjb25zdCBjb3VudHMgPSBncm91cENvdW50c0J5VGltZSh0aW1lcywgdGltZVNpemUpO1xyXG4gICAgICAgIHJldHVybiBjb3VudHM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZyb21Db21tZW50c0RhdGEoY29tbWVudHNEYXRhOiBDb21tZW50RGF0YVtdKSA6IENvbW1lbnRSZXBvc2l0b3J5IHtcclxuICAgICAgICBjb25zdCBjb21tZW50cyA9IGNvbW1lbnRzRGF0YS5tYXAoQ29tbWVudC5wYXJzZUNvbW1lbnQpO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbWVudFJlcG9zaXRvcnkoY29tbWVudHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY29tbWVudENvbXBhcmVGbihhOiBDb21tZW50LCBiOiBDb21tZW50KSA6IG51bWJlciB7XHJcbiAgICBjb25zdCBhVGltZSA9IGEucmVsYXRpdmVUaW1lLCBiVGltZSA9IGIucmVsYXRpdmVUaW1lO1xyXG4gICAgaWYoYVRpbWUgPCBiVGltZSkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIGlmKGFUaW1lID4gYlRpbWUpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIC8vIElmIHR3byBjb21tZW50cyBhcmUgcG9zdGVkIGF0IHRoZSBzYW1lIHRpbWUsIGNvbXBhcmUgYnkgaWQgZm9yIHRpZS1icmVha2luZy5cclxuICAgIC8vIFZlcnkgdW5saWtlbHkgYmVjYXVzZSB0aGUgcmVsYXRpdmUgdGltZXMgYXJlIGluIG1pbGlzZWNvbmRzXHJcbiAgICByZXR1cm4gYS5pZC5sb2NhbGVDb21wYXJlKGIuaWQpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==