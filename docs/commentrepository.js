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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21tZW50cmVwb3NpdG9yeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb21tZW50cmVwb3NpdG9yeS8uL3NyYy90aW1ldXRpbC50cyIsIndlYnBhY2s6Ly9jb21tZW50cmVwb3NpdG9yeS8uL3NyYy9tb2RlbHMudHMiLCJ3ZWJwYWNrOi8vY29tbWVudHJlcG9zaXRvcnkvLi9zcmMvY291bnRlci50cyIsIndlYnBhY2s6Ly9jb21tZW50cmVwb3NpdG9yeS8uL3NyYy9yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRk8sU0FBUyxZQUFZLENBQUMsT0FBZTtJQUN4QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN0QyxPQUFPLEdBQUcsT0FB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SUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFlBQTJCO1FBQy9DLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsY0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hELE9BQU8sSUFBSSw0QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFHRCxTQUFTLGdCQUFnQixDQUFDLENBQVUsRUFBRSxDQUFVO0lBQzVDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDckQsSUFBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNiO0lBQ0QsSUFBRyxLQUFLLEdBQUcsS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLENBQUM7S0FDWjtJQUNELCtFQUErRTtJQUMvRSw4REFBOEQ7SUFDOUQsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEMsQ0FBQyIsImZpbGUiOiJjb21tZW50cmVwb3NpdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvVGltZVN0cmluZyhzZWNvbmRzOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGhvdXIgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICBzZWNvbmRzID0gc2Vjb25kcyAlIDYwO1xyXG4gICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgIHNlY29uZHMgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCk7XHJcblxyXG4gICAgY29uc3QgaG91clN0ciA9IGhvdXIudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgY29uc3QgbWludXRlU3RyID0gbWludXRlcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICBjb25zdCBzZWNvbmRTdHIgPSBzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgIHJldHVybiBgJHtob3VyU3RyfToke21pbnV0ZVN0cn06JHtzZWNvbmRTdHJ9YDtcclxufSIsImltcG9ydCB7IEZyYWdtZW50RGF0YSwgRW1vdGVSYW5nZURhdGEsIENvbW1lbnRlckRhdGEsIENvbW1lbnREYXRhLCBVc2VyQmFkZ2VEYXRhIH0gZnJvbSBcIi4vZGF0YV9tb2RlbHNcIjtcclxuaW1wb3J0IHsgdG9UaW1lU3RyaW5nIH0gZnJvbSBcIi4vdGltZXV0aWxcIjtcclxuaW1wb3J0IHsgQ29tbWVudFJlcG9zaXRvcnkgfSBmcm9tIFwiLi9yZXBvc2l0b3J5XCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXIge1xyXG4gICAgaWQ6IG51bWJlcjtcclxuICAgIHVzZXJuYW1lOiBzdHJpbmc7XHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nO1xyXG4gICAgY3JlYXRlZFRpbWU6IG51bWJlcjsgIC8vIGVwb2NoIHRpbWUgc2Vjb25kc1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG5cclxuICAgIHN0YXRpYyBwYXJzZVVzZXIoZGF0YTogQ29tbWVudGVyRGF0YSkgOiBVc2VyIHtcclxuICAgICAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICB1c2VyLmlkID0gTnVtYmVyKGRhdGEuX2lkKTtcclxuICAgICAgICB1c2VyLnVzZXJuYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgICAgIHVzZXIuZGlzcGxheU5hbWUgPSBkYXRhLmRpc3BsYXlfbmFtZTtcclxuICAgICAgICB1c2VyLmNyZWF0ZWRUaW1lID0gbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0KS5nZXRUaW1lKCkgLyAxMDAwLjA7XHJcbiAgICAgICAgdXNlci50eXBlID0gZGF0YS50eXBlO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHVzZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzcGxheSBzdHJpbmcgb2YgdGhlIFR3aXRjaCB1c2VyLiBTYW1lIGZvcm1hdCBhcyBpbiBvZmZpY2lhbCBUd2l0Y2ggY2hhdCBodG1sXHJcbiAgICBnZXREaXNwbGF5U3RyaW5nKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIGlmKHRoaXMuZGlzcGxheU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy51c2VybmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5kaXNwbGF5TmFtZX0oJHt0aGlzLnVzZXJuYW1lfSlgO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEVtb3RlIHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBlbW90ZVNldElkOiBzdHJpbmc7ICAvLyBjYW4gYmUgZW1wdHkgc3RyaW5nXHJcblxyXG4gICAgc3RhdGljIHBhcnNlRW1vdGUoZGF0YTogRnJhZ21lbnREYXRhKSA6IEVtb3RlIHtcclxuICAgICAgICBpZighZGF0YS5lbW90aWNvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZW1vdGVEYXRhID0gZGF0YS5lbW90aWNvbjtcclxuICAgICAgICBjb25zdCBlbW90ZSA9IG5ldyBFbW90ZSgpO1xyXG4gICAgICAgIGVtb3RlLmlkID0gcGFyc2VJbnQoZW1vdGVEYXRhLmVtb3RpY29uX2lkKTtcclxuICAgICAgICBlbW90ZS5uYW1lID0gZGF0YS50ZXh0O1xyXG4gICAgICAgIGVtb3RlLmVtb3RlU2V0SWQgPSBlbW90ZURhdGEuZW1vdGljb25fc2V0X2lkO1xyXG4gICAgICAgIHJldHVybiBlbW90ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbWFnZVVybCgpIDogc3RyaW5nIHtcclxuICAgICAgICAvLyBBcyBvZiBKdWx5IDIwMjAsIHRoaXMgYWRkcmVzcyBmb3JtYXQgaXMgdXAtdG8tZGF0ZVxyXG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJHt0aGlzLmlkfS8xLjBgO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1lbnQge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIGNoYW5uZWw6IG51bWJlcjtcclxuICAgIHJlbGF0aXZlVGltZTogbnVtYmVyOyAgLy8gUmVsYXRpdmUgdGltZSBpbiBzZWNvbmRzIGZyb20gdmlkZW8gc3RhcnRcclxuICAgIGFic29sdXRlVGltZTogbnVtYmVyOyAgLy8gZXBvY2ggdGltZSBzZWNvbmRzICAgXHJcbiAgICBcclxuICAgIGJpdHM6IG51bWJlcjtcclxuICAgIHJhd1RleHQ6IHN0cmluZzsgIC8vIFJhdyB0ZXh0IHdoZXJlIGFsbCBlbW90ZXMgYXJlIHN0b3JlZCBhcyB0ZXh0eFxyXG4gICAgY29udGVudFRleHQ6IHN0cmluZzsgIC8vIFB1cmUgdGV4dCB3aXRob3V0IGVtb3Rlc1xyXG4gICAgY29udGVudExlbmd0aDogbnVtYmVyICAvLyBMZW5ndGggb2YgY2hhdCBjb250ZW50LCB3aGVyZSBlYWNoIGVtb3RlIGhhcyBsZW5ndGggMVxyXG4gICAgdXNlcjogVXNlcjtcclxuICAgIGZyYWdtZW50czogRnJhZ21lbnREYXRhW107XHJcbiAgICBlbW90ZXM6IEVtb3RlW107ICAvLyBMaXN0IG9mIGVtb3RlcyB1c2VkIGluIHRoZSBjb21tZW50XHJcbiAgICBiYWRnZXM6IFVzZXJCYWRnZURhdGFbXTtcclxuXHJcbiAgICB0b0Rpc3BsYXlTdHJpbmcoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgdGltZVN0ciA9IHRvVGltZVN0cmluZyh0aGlzLnJlbGF0aXZlVGltZSk7XHJcbiAgICAgICAgcmV0dXJuIGBbJHt0aW1lU3RyfV0gKCR7dGhpcy51c2VyLmRpc3BsYXlOYW1lfSk6ICR7dGhpcy5yYXdUZXh0fWA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBhcnNlQ29tbWVudChkYXRhOiBDb21tZW50RGF0YSkgOiBDb21tZW50IHtcclxuICAgICAgICBjb25zdCBjb21tZW50ID0gbmV3IENvbW1lbnQoKTtcclxuICAgICAgICBjb21tZW50LmlkID0gZGF0YS5faWQ7XHJcbiAgICAgICAgY29tbWVudC5jaGFubmVsID0gTnVtYmVyKGRhdGEuY2hhbm5lbF9pZCk7XHJcbiAgICAgICAgY29tbWVudC5yZWxhdGl2ZVRpbWUgPSBkYXRhLmNvbnRlbnRfb2Zmc2V0X3NlY29uZHM7XHJcbiAgICAgICAgY29tbWVudC5hYnNvbHV0ZVRpbWUgPSBuZXcgRGF0ZShkYXRhLmNyZWF0ZWRfYXQpLmdldFRpbWUoKSAvIDEwMDAuMDtcclxuXHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcclxuICAgICAgICBjb21tZW50LmJpdHMgPSBtZXNzYWdlLmJpdHNfc3BlbnQgPz8gMDtcclxuICAgICAgICBjb21tZW50LnJhd1RleHQgPSBtZXNzYWdlLmJvZHkgPz8gXCJcIjsgIC8vIFJhdyB0ZXh0XHJcbiAgICAgICAgY29tbWVudC5mcmFnbWVudHMgPSBtZXNzYWdlLmZyYWdtZW50cyA/PyBbXTtcclxuICAgICAgICBjb21tZW50LnVzZXIgPSBVc2VyLnBhcnNlVXNlcihkYXRhLmNvbW1lbnRlcik7XHJcbiAgICAgICAgY29tbWVudC5iYWRnZXMgPSBtZXNzYWdlLnVzZXJfYmFkZ2VzID8/IFtdO1xyXG5cclxuICAgICAgICAvLyBCdWlsZCBlbW90ZXMgYW5kIHRleHQgY29udGVudHNcclxuICAgICAgICBjb21tZW50LmVtb3RlcyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHRleHRGcmFnbWVudHMgOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGNvbW1lbnQuY29udGVudExlbmd0aCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBmcmFnbWVudERhdGEgb2YgY29tbWVudC5mcmFnbWVudHMpIHtcclxuICAgICAgICAgICAgaWYoZnJhZ21lbnREYXRhLmVtb3RpY29uKSB7ICAvLyBFbW90ZSBmcmFnbWVudFxyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1vdGUgPSBFbW90ZS5wYXJzZUVtb3RlKGZyYWdtZW50RGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb21tZW50LmVtb3Rlcy5wdXNoKGVtb3RlKTtcclxuICAgICAgICAgICAgICAgIGNvbW1lbnQuY29udGVudExlbmd0aCArPSAxOyAgLy8gRm9yIG5vdywgZW1vdGVzIGFyZSBhc3N1bWVkIHRvIGhhdmUgY29udGVudCBsZW5ndGggMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAgLy8gVGV4dCBmcmFnbWVudFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGZyYWdtZW50RGF0YS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgdGV4dEZyYWdtZW50cy5wdXNoKHRleHQudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgIGNvbW1lbnQuY29udGVudExlbmd0aCArPSB0ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZWR1Y2UgYWxsIHNwYWNlcyBiZXR3ZWVuIHRleHQgZnJhZ21lbnRzIHRvIGp1c3Qgb25lIHNwYWNlLCBmb3IgZWFzZSBvZiBzZWFyY2ggYW5kIGZpbHRlclxyXG4gICAgICAgIC8vIFRPRE86IElzIHRoaXMgdGhlIHJpZ2h0IHdheT9cclxuICAgICAgICBjb21tZW50LmNvbnRlbnRUZXh0ID0gdGV4dEZyYWdtZW50cy5qb2luKFwiIFwiKTtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiBjb21tZW50O1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBJbnRlZ2VyTGlzdCB9IGZyb20gXCJhbnRscjR0cy9taXNjL0ludGVnZXJMaXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLZXlXaXRoQ291bnQge1xyXG4gICAga2V5OiBudW1iZXI7XHJcbiAgICBjb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYmlnZ2VyQ291bnRGbihrYzE6IEtleVdpdGhDb3VudCwga2MyOiBLZXlXaXRoQ291bnQpIDogbnVtYmVyIHtcclxuICAgIGlmKGtjMS5jb3VudCAhPT0ga2MyLmNvdW50KSB7XHJcbiAgICAgICAgLy8gSXRlbSB3aXRoIG1vcmUgY291bnQgY29tZXMgZmlyc3RcclxuICAgICAgICByZXR1cm4ga2MxLmNvdW50ID4ga2MyLmNvdW50ID8gLTEgOiAxO1xyXG4gICAgfVxyXG4gICAgaWYoa2MxLmtleSAhPT0ga2MyLmtleSkge1xyXG4gICAgICAgIHJldHVybiBrYzEua2V5IDwga2MyLmtleSA/IC0xIDogMTtcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvdW50ZXIge1xyXG4gICAgcmVhZG9ubHkgbWFwOiBNYXA8bnVtYmVyLCBudW1iZXI+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQoa2V5OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubWFwLmdldChrZXkpID8/IDA7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IFRoaXMgY2FuIGJlIG9wdGltaXplZCB3aXRoIHByaW9yaXR5IHF1ZXVlXHJcbiAgICAvLyB3aGVuIHRvcENvdW50IGlzIHNpZ25pZmljYW50bHkgc21hbGxlciB0aGFuIG1hcCBzaXplXHJcbiAgICBnZXRUb3BLZXlzKHRvcENvdW50ID0gMCkgOiBLZXlXaXRoQ291bnRbXSB7XHJcbiAgICAgICAgY29uc3QgYXJyIDogS2V5V2l0aENvdW50W10gPSBbXTtcclxuICAgICAgICBmb3IoY29uc3QgW2tleSwgY291bnRdIG9mIHRoaXMubWFwKSB7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHtrZXksIGNvdW50fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5zb3J0KGJpZ2dlckNvdW50Rm4pO1xyXG5cclxuICAgICAgICBpZigwIDwgdG9wQ291bnQgJiYgdG9wQ291bnQgPCBhcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnIuc2xpY2UoMCwgdG9wQ291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIGluY3JlbWVudChrZXk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlKGtleSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2Uoa2V5OiBudW1iZXIsIGRlbHRhOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0KGtleSk7XHJcbiAgICAgICAgdGhpcy5tYXAuc2V0KGtleSwgdmFsdWUgKyBkZWx0YSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHsgVXNlciwgQ29tbWVudCwgRW1vdGUgfSBmcm9tIFwiLi9tb2RlbHNcIjtcclxuaW1wb3J0IHsgQ29tbWVudERhdGEgfSBmcm9tIFwiLi9kYXRhX21vZGVsc1wiO1xyXG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tIFwiLi9maWx0ZXIvZmlsdGVyXCI7XHJcbmltcG9ydCB7IENvdW50ZXIgfSBmcm9tIFwiLi9jb3VudGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVc2VyV2l0aENvdW50IHtcclxuICAgIHVzZXI6IFVzZXIsXHJcbiAgICBjb3VudDogbnVtYmVyLFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJSZXBvc2l0b3J5IHtcclxuICAgIHJlYWRvbmx5IHVzZXJCeUlkOiBNYXA8bnVtYmVyLCBVc2VyPjtcclxuICAgIHJlYWRvbmx5IGNoYXRDb3VudGVyOiBDb3VudGVyOyAgLy8gQ2hhdCBjb3VudCBieSB1c2VyXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudXNlckJ5SWQgPSBuZXcgTWFwPG51bWJlciwgVXNlcj4oKTtcclxuICAgICAgICB0aGlzLmNoYXRDb3VudGVyID0gbmV3IENvdW50ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDaGF0dGVyKHVzZXI6IFVzZXIpIHtcclxuICAgICAgICB0aGlzLnVzZXJCeUlkLnNldCh1c2VyLmlkLCB1c2VyKTtcclxuICAgICAgICB0aGlzLmNoYXRDb3VudGVyLmluY3JlbWVudCh1c2VyLmlkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51c2VyQnlJZC5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCB1c2VycyB3aXRoIG1vc3QgY2hhdHMsIHRpZS1icmVha2luZyB3aXRoIHVzZXIgSURcclxuICAgIGdldFRvcENoYXR0ZXJzKHRvcENvdW50ID0gMCkgOiBVc2VyV2l0aENvdW50W10ge1xyXG4gICAgICAgIGNvbnN0IGtleXNXaXRoQ291bnQgPSB0aGlzLmNoYXRDb3VudGVyLmdldFRvcEtleXModG9wQ291bnQpO1xyXG4gICAgICAgIHJldHVybiBrZXlzV2l0aENvdW50Lm1hcCgoa2MpID0+ICh7XHJcbiAgICAgICAgICAgIHVzZXI6IHRoaXMudXNlckJ5SWQuZ2V0KGtjLmtleSksXHJcbiAgICAgICAgICAgIGNvdW50OiBrYy5jb3VudFxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyQ291bnQoKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlckJ5SWQuc2l6ZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW1vdGVXaXRoQ291bnQge1xyXG4gICAgZW1vdGU6IEVtb3RlLFxyXG4gICAgY291bnQ6IG51bWJlcixcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBFbW90ZVJlcG9zaXRvcnkge1xyXG4gICAgcmVhZG9ubHkgZW1vdGVCeUlkOiBNYXA8bnVtYmVyLCBFbW90ZT47XHJcbiAgICByZWFkb25seSBlbW90ZUJ5TmFtZTogTWFwPHN0cmluZywgRW1vdGU+O1xyXG4gICAgcmVhZG9ubHkgdG90YWxDb3VudGVyOiBDb3VudGVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZW1vdGVCeUlkID0gbmV3IE1hcDxudW1iZXIsIEVtb3RlPigpO1xyXG4gICAgICAgIHRoaXMuZW1vdGVCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgRW1vdGU+KCk7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ZXIgPSBuZXcgQ291bnRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ5SWQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtb3RlQnlJZC5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbW90ZUJ5TmFtZS5nZXQobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q291bnQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvdGFsQ291bnRlci5nZXQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEdldCBtb3N0IHVzZWQge3RvcENvdW50fSBlbW90ZXMsIHRpZS1icmVha2luZyB3aXRoIGVtb3RlIElELlxyXG4gICAgZ2V0VG9wRW1vdGVzKHRvcENvdW50ID0gMCkgOiBFbW90ZVdpdGhDb3VudFtdIHtcclxuICAgICAgICBjb25zdCBrZXlzV2l0aENvdW50ID0gdGhpcy50b3RhbENvdW50ZXIuZ2V0VG9wS2V5cyh0b3BDb3VudCk7XHJcbiAgICAgICAgcmV0dXJuIGtleXNXaXRoQ291bnQubWFwKChrYykgPT4gKHtcclxuICAgICAgICAgICAgZW1vdGU6IHRoaXMuZW1vdGVCeUlkLmdldChrYy5rZXkpLFxyXG4gICAgICAgICAgICBjb3VudDoga2MuY291bnRcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIGxpc3Qgb2YgZW1vdGVzIGZyb20gdGhlIHNhbWUgY2hhdFxyXG4gICAgYWRkQ2hhdEVtb3RlcyhlbW90ZXM6IEVtb3RlW10pIHtcclxuICAgICAgICBmb3IobGV0IGVtb3RlIG9mIGVtb3Rlcykge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsQ291bnRlci5pbmNyZW1lbnQoZW1vdGUuaWQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeVNlZW4gPSB0aGlzLmVtb3RlQnlJZC5oYXMoZW1vdGUuaWQpO1xyXG4gICAgICAgICAgICBpZighYWxyZWFkeVNlZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1vdGVCeUlkLnNldChlbW90ZS5pZCwgZW1vdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbW90ZUJ5TmFtZS5zZXQoZW1vdGUubmFtZSwgZW1vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1lbnRSZXBvc2l0b3J5IHtcclxuICAgIHJlYWRvbmx5IHVzZXJSZXBvc2l0b3J5OiBVc2VyUmVwb3NpdG9yeTtcclxuICAgIHJlYWRvbmx5IGVtb3RlUmVwb3NpdG9yeTogRW1vdGVSZXBvc2l0b3J5O1xyXG4gICAgcmVhZG9ubHkgY29tbWVudExpc3Q6IENvbW1lbnRbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb21tZW50czogQ29tbWVudFtdKSB7XHJcbiAgICAgICAgdGhpcy51c2VyUmVwb3NpdG9yeSA9IG5ldyBVc2VyUmVwb3NpdG9yeSgpO1xyXG4gICAgICAgIHRoaXMuZW1vdGVSZXBvc2l0b3J5ID0gbmV3IEVtb3RlUmVwb3NpdG9yeSgpO1xyXG4gICAgICAgIHRoaXMuY29tbWVudExpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IGNvbW1lbnQgb2YgY29tbWVudHMpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb21tZW50KGNvbW1lbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSnVzdCBpbiBjYXNlIHRoZSBjb21tZW50TGlzdCBpcyBub3Qgc29ydGVkIGJ5IHRpbWVcclxuICAgICAgICB0aGlzLmNvbW1lbnRMaXN0LnNvcnQoY29tbWVudENvbXBhcmVGbik7XHJcbiAgICB9XHJcbiBcclxuICAgIGFkZENvbW1lbnQoY29tbWVudDogQ29tbWVudCkge1xyXG4gICAgICAgIHRoaXMudXNlclJlcG9zaXRvcnkuYWRkQ2hhdHRlcihjb21tZW50LnVzZXIpO1xyXG4gICAgICAgIHRoaXMuZW1vdGVSZXBvc2l0b3J5LmFkZENoYXRFbW90ZXMoY29tbWVudC5lbW90ZXMpO1xyXG4gICAgICAgIHRoaXMuY29tbWVudExpc3QucHVzaChjb21tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRVc2VyQ291bnQoKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclJlcG9zaXRvcnkuZ2V0VXNlckNvdW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29tbWVudENvdW50KCkgOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1lbnRMaXN0Lmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3BFbW90ZXModG9wQ291bnQgPSAwKSA6IEVtb3RlV2l0aENvdW50W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVtb3RlUmVwb3NpdG9yeS5nZXRUb3BFbW90ZXModG9wQ291bnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRvcENoYXR0ZXJzKHRvcENvdW50ID0gMCkgOiBVc2VyV2l0aENvdW50W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJSZXBvc2l0b3J5LmdldFRvcENoYXR0ZXJzKHRvcENvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb21tZW50cygpIDogQ29tbWVudFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21tZW50TGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3RhbEJpdHMoKSA6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWVudExpc3QucmVkdWNlKChwcmV2LCBjdXJyKSA9PiBwcmV2ICsgY3Vyci5iaXRzLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXIoZnQ6IEZpbHRlcikgOiBDb21tZW50W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1lbnRMaXN0LmZpbHRlcigoY29tbWVudCkgPT4gZnQuZXZhbChjb21tZW50KSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZyb21Db21tZW50c0RhdGEoY29tbWVudHNEYXRhOiBDb21tZW50RGF0YVtdKSA6IENvbW1lbnRSZXBvc2l0b3J5IHtcclxuICAgICAgICBjb25zdCBjb21tZW50cyA9IGNvbW1lbnRzRGF0YS5tYXAoQ29tbWVudC5wYXJzZUNvbW1lbnQpO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tbWVudFJlcG9zaXRvcnkoY29tbWVudHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY29tbWVudENvbXBhcmVGbihhOiBDb21tZW50LCBiOiBDb21tZW50KSA6IG51bWJlciB7XHJcbiAgICBjb25zdCBhVGltZSA9IGEucmVsYXRpdmVUaW1lLCBiVGltZSA9IGIucmVsYXRpdmVUaW1lO1xyXG4gICAgaWYoYVRpbWUgPCBiVGltZSkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIGlmKGFUaW1lID4gYlRpbWUpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIC8vIElmIHR3byBjb21tZW50cyBhcmUgcG9zdGVkIGF0IHRoZSBzYW1lIHRpbWUsIGNvbXBhcmUgYnkgaWQgZm9yIHRpZS1icmVha2luZy5cclxuICAgIC8vIFZlcnkgdW5saWtlbHkgYmVjYXVzZSB0aGUgcmVsYXRpdmUgdGltZXMgYXJlIGluIG1pbGlzZWNvbmRzXHJcbiAgICByZXR1cm4gYS5pZC5sb2NhbGVDb21wYXJlKGIuaWQpO1xyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==