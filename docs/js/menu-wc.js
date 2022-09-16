'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Teneno API documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AdminModule-72a1571bec71660c07d6385c7c9dc5ef994e3a81614555afd38ae043e516c8ed955da3d3d530a129214038af7e83d37b184d6332c0b083932d71611540dbd37e"' : 'data-target="#xs-controllers-links-module-AdminModule-72a1571bec71660c07d6385c7c9dc5ef994e3a81614555afd38ae043e516c8ed955da3d3d530a129214038af7e83d37b184d6332c0b083932d71611540dbd37e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-72a1571bec71660c07d6385c7c9dc5ef994e3a81614555afd38ae043e516c8ed955da3d3d530a129214038af7e83d37b184d6332c0b083932d71611540dbd37e"' :
                                            'id="xs-controllers-links-module-AdminModule-72a1571bec71660c07d6385c7c9dc5ef994e3a81614555afd38ae043e516c8ed955da3d3d530a129214038af7e83d37b184d6332c0b083932d71611540dbd37e"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AdminUsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminUsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdminModule-72a1571bec71660c07d6385c7c9dc5ef994e3a81614555afd38ae043e516c8ed955da3d3d530a129214038af7e83d37b184d6332c0b083932d71611540dbd37e"' : 'data-target="#xs-injectables-links-module-AdminModule-72a1571bec71660c07d6385c7c9dc5ef994e3a81614555afd38ae043e516c8ed955da3d3d530a129214038af7e83d37b184d6332c0b083932d71611540dbd37e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-72a1571bec71660c07d6385c7c9dc5ef994e3a81614555afd38ae043e516c8ed955da3d3d530a129214038af7e83d37b184d6332c0b083932d71611540dbd37e"' :
                                        'id="xs-injectables-links-module-AdminModule-72a1571bec71660c07d6385c7c9dc5ef994e3a81614555afd38ae043e516c8ed955da3d3d530a129214038af7e83d37b184d6332c0b083932d71611540dbd37e"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-38a511ab28291fb53c3a78d553b5eb4026a2d738704b95f25db9fee6b4f159c21df8c29fb2b256da79391236d9ceae1122cf1a7804c5cd3c1ca092155622245a"' : 'data-target="#xs-controllers-links-module-AppModule-38a511ab28291fb53c3a78d553b5eb4026a2d738704b95f25db9fee6b4f159c21df8c29fb2b256da79391236d9ceae1122cf1a7804c5cd3c1ca092155622245a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-38a511ab28291fb53c3a78d553b5eb4026a2d738704b95f25db9fee6b4f159c21df8c29fb2b256da79391236d9ceae1122cf1a7804c5cd3c1ca092155622245a"' :
                                            'id="xs-controllers-links-module-AppModule-38a511ab28291fb53c3a78d553b5eb4026a2d738704b95f25db9fee6b4f159c21df8c29fb2b256da79391236d9ceae1122cf1a7804c5cd3c1ca092155622245a"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-38a511ab28291fb53c3a78d553b5eb4026a2d738704b95f25db9fee6b4f159c21df8c29fb2b256da79391236d9ceae1122cf1a7804c5cd3c1ca092155622245a"' : 'data-target="#xs-injectables-links-module-AppModule-38a511ab28291fb53c3a78d553b5eb4026a2d738704b95f25db9fee6b4f159c21df8c29fb2b256da79391236d9ceae1122cf1a7804c5cd3c1ca092155622245a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-38a511ab28291fb53c3a78d553b5eb4026a2d738704b95f25db9fee6b4f159c21df8c29fb2b256da79391236d9ceae1122cf1a7804c5cd3c1ca092155622245a"' :
                                        'id="xs-injectables-links-module-AppModule-38a511ab28291fb53c3a78d553b5eb4026a2d738704b95f25db9fee6b4f159c21df8c29fb2b256da79391236d9ceae1122cf1a7804c5cd3c1ca092155622245a"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-782de172046662acd2dab62bc21f6ccedac48128629bd2e376cca2f9298947036b83d7adaeb8f7d1996adaf41e99bd7a75c6642de19cecbc53307f66b4de82d3"' : 'data-target="#xs-controllers-links-module-AuthModule-782de172046662acd2dab62bc21f6ccedac48128629bd2e376cca2f9298947036b83d7adaeb8f7d1996adaf41e99bd7a75c6642de19cecbc53307f66b4de82d3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-782de172046662acd2dab62bc21f6ccedac48128629bd2e376cca2f9298947036b83d7adaeb8f7d1996adaf41e99bd7a75c6642de19cecbc53307f66b4de82d3"' :
                                            'id="xs-controllers-links-module-AuthModule-782de172046662acd2dab62bc21f6ccedac48128629bd2e376cca2f9298947036b83d7adaeb8f7d1996adaf41e99bd7a75c6642de19cecbc53307f66b4de82d3"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-782de172046662acd2dab62bc21f6ccedac48128629bd2e376cca2f9298947036b83d7adaeb8f7d1996adaf41e99bd7a75c6642de19cecbc53307f66b4de82d3"' : 'data-target="#xs-injectables-links-module-AuthModule-782de172046662acd2dab62bc21f6ccedac48128629bd2e376cca2f9298947036b83d7adaeb8f7d1996adaf41e99bd7a75c6642de19cecbc53307f66b4de82d3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-782de172046662acd2dab62bc21f6ccedac48128629bd2e376cca2f9298947036b83d7adaeb8f7d1996adaf41e99bd7a75c6642de19cecbc53307f66b4de82d3"' :
                                        'id="xs-injectables-links-module-AuthModule-782de172046662acd2dab62bc21f6ccedac48128629bd2e376cca2f9298947036b83d7adaeb8f7d1996adaf41e99bd7a75c6642de19cecbc53307f66b4de82d3"' }>
                                        <li class="link">
                                            <a href="injectables/AtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConversationsModule.html" data-type="entity-link" >ConversationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ConversationsModule-5558b7af69b0260dda65244d95844b45168043d3c51fa39f03eb2912594c77bcf0cb360f32ac40a25d3f6a3effc7521dda5cb4ceaa192e363d08086ad7886c61"' : 'data-target="#xs-controllers-links-module-ConversationsModule-5558b7af69b0260dda65244d95844b45168043d3c51fa39f03eb2912594c77bcf0cb360f32ac40a25d3f6a3effc7521dda5cb4ceaa192e363d08086ad7886c61"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConversationsModule-5558b7af69b0260dda65244d95844b45168043d3c51fa39f03eb2912594c77bcf0cb360f32ac40a25d3f6a3effc7521dda5cb4ceaa192e363d08086ad7886c61"' :
                                            'id="xs-controllers-links-module-ConversationsModule-5558b7af69b0260dda65244d95844b45168043d3c51fa39f03eb2912594c77bcf0cb360f32ac40a25d3f6a3effc7521dda5cb4ceaa192e363d08086ad7886c61"' }>
                                            <li class="link">
                                                <a href="controllers/ConversationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConversationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConversationsModule-5558b7af69b0260dda65244d95844b45168043d3c51fa39f03eb2912594c77bcf0cb360f32ac40a25d3f6a3effc7521dda5cb4ceaa192e363d08086ad7886c61"' : 'data-target="#xs-injectables-links-module-ConversationsModule-5558b7af69b0260dda65244d95844b45168043d3c51fa39f03eb2912594c77bcf0cb360f32ac40a25d3f6a3effc7521dda5cb4ceaa192e363d08086ad7886c61"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConversationsModule-5558b7af69b0260dda65244d95844b45168043d3c51fa39f03eb2912594c77bcf0cb360f32ac40a25d3f6a3effc7521dda5cb4ceaa192e363d08086ad7886c61"' :
                                        'id="xs-injectables-links-module-ConversationsModule-5558b7af69b0260dda65244d95844b45168043d3c51fa39f03eb2912594c77bcf0cb360f32ac40a25d3f6a3effc7521dda5cb4ceaa192e363d08086ad7886c61"' }>
                                        <li class="link">
                                            <a href="injectables/ConversationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConversationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-FilesModule-09e0b0837b65ac03896ef6885f70b4d124323d7a1af42539ae89bc77663de788243d6e8fe438296afd327103b2645f6d8c0b6957c2a63e6863fb08e04b73cade"' : 'data-target="#xs-controllers-links-module-FilesModule-09e0b0837b65ac03896ef6885f70b4d124323d7a1af42539ae89bc77663de788243d6e8fe438296afd327103b2645f6d8c0b6957c2a63e6863fb08e04b73cade"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-09e0b0837b65ac03896ef6885f70b4d124323d7a1af42539ae89bc77663de788243d6e8fe438296afd327103b2645f6d8c0b6957c2a63e6863fb08e04b73cade"' :
                                            'id="xs-controllers-links-module-FilesModule-09e0b0837b65ac03896ef6885f70b4d124323d7a1af42539ae89bc77663de788243d6e8fe438296afd327103b2645f6d8c0b6957c2a63e6863fb08e04b73cade"' }>
                                            <li class="link">
                                                <a href="controllers/FileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InterceptorModule.html" data-type="entity-link" >InterceptorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MathModule.html" data-type="entity-link" >MathModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MathModule-8c1e2dca6e248f5c3935dd7783b77f26afdb92b5dceabfa6915a3eb469a3a91c48db2f2435fb97f033eb3a087ca458692964f7fee614eadf54aa6dc474a81172"' : 'data-target="#xs-controllers-links-module-MathModule-8c1e2dca6e248f5c3935dd7783b77f26afdb92b5dceabfa6915a3eb469a3a91c48db2f2435fb97f033eb3a087ca458692964f7fee614eadf54aa6dc474a81172"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MathModule-8c1e2dca6e248f5c3935dd7783b77f26afdb92b5dceabfa6915a3eb469a3a91c48db2f2435fb97f033eb3a087ca458692964f7fee614eadf54aa6dc474a81172"' :
                                            'id="xs-controllers-links-module-MathModule-8c1e2dca6e248f5c3935dd7783b77f26afdb92b5dceabfa6915a3eb469a3a91c48db2f2435fb97f033eb3a087ca458692964f7fee614eadf54aa6dc474a81172"' }>
                                            <li class="link">
                                                <a href="controllers/MathController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MathController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagesModule.html" data-type="entity-link" >MessagesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MessagesModule-f3eba9639dda42ec0727913ba701da337ed6970464c671ca2e9ae2400445d1c5eaa5a777eb5f380941b47c2ab38cec9a51e6d7b9f56c728d4c8323122a326a5f"' : 'data-target="#xs-injectables-links-module-MessagesModule-f3eba9639dda42ec0727913ba701da337ed6970464c671ca2e9ae2400445d1c5eaa5a777eb5f380941b47c2ab38cec9a51e6d7b9f56c728d4c8323122a326a5f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessagesModule-f3eba9639dda42ec0727913ba701da337ed6970464c671ca2e9ae2400445d1c5eaa5a777eb5f380941b47c2ab38cec9a51e6d7b9f56c728d4c8323122a326a5f"' :
                                        'id="xs-injectables-links-module-MessagesModule-f3eba9639dda42ec0727913ba701da337ed6970464c671ca2e9ae2400445d1c5eaa5a777eb5f380941b47c2ab38cec9a51e6d7b9f56c728d4c8323122a326a5f"' }>
                                        <li class="link">
                                            <a href="injectables/MessagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OauthModule.html" data-type="entity-link" >OauthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OauthModule-dc9d5b0605b1eef3a74895c770fcf2e8f1d9b884ef2f05bdca6f3c9e5f5a704479f19aa99447e7660ae8f5b049dfaeddaf0f921a5e87b17217686aa2f7e91a9b"' : 'data-target="#xs-controllers-links-module-OauthModule-dc9d5b0605b1eef3a74895c770fcf2e8f1d9b884ef2f05bdca6f3c9e5f5a704479f19aa99447e7660ae8f5b049dfaeddaf0f921a5e87b17217686aa2f7e91a9b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OauthModule-dc9d5b0605b1eef3a74895c770fcf2e8f1d9b884ef2f05bdca6f3c9e5f5a704479f19aa99447e7660ae8f5b049dfaeddaf0f921a5e87b17217686aa2f7e91a9b"' :
                                            'id="xs-controllers-links-module-OauthModule-dc9d5b0605b1eef3a74895c770fcf2e8f1d9b884ef2f05bdca6f3c9e5f5a704479f19aa99447e7660ae8f5b049dfaeddaf0f921a5e87b17217686aa2f7e91a9b"' }>
                                            <li class="link">
                                                <a href="controllers/OauthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OauthModule-dc9d5b0605b1eef3a74895c770fcf2e8f1d9b884ef2f05bdca6f3c9e5f5a704479f19aa99447e7660ae8f5b049dfaeddaf0f921a5e87b17217686aa2f7e91a9b"' : 'data-target="#xs-injectables-links-module-OauthModule-dc9d5b0605b1eef3a74895c770fcf2e8f1d9b884ef2f05bdca6f3c9e5f5a704479f19aa99447e7660ae8f5b049dfaeddaf0f921a5e87b17217686aa2f7e91a9b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OauthModule-dc9d5b0605b1eef3a74895c770fcf2e8f1d9b884ef2f05bdca6f3c9e5f5a704479f19aa99447e7660ae8f5b049dfaeddaf0f921a5e87b17217686aa2f7e91a9b"' :
                                        'id="xs-injectables-links-module-OauthModule-dc9d5b0605b1eef3a74895c770fcf2e8f1d9b884ef2f05bdca6f3c9e5f5a704479f19aa99447e7660ae8f5b049dfaeddaf0f921a5e87b17217686aa2f7e91a9b"' }>
                                        <li class="link">
                                            <a href="injectables/FacebookStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacebookStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostsModule-b56e8e28979ee719eb766bcb9e5203f1586d7c6c047f15c69dad6047c34071f6bc46faf9f50aba63bcd342cfe9ae3a384dc550ac1d8d0d08c423cab9c58c5334"' : 'data-target="#xs-controllers-links-module-PostsModule-b56e8e28979ee719eb766bcb9e5203f1586d7c6c047f15c69dad6047c34071f6bc46faf9f50aba63bcd342cfe9ae3a384dc550ac1d8d0d08c423cab9c58c5334"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-b56e8e28979ee719eb766bcb9e5203f1586d7c6c047f15c69dad6047c34071f6bc46faf9f50aba63bcd342cfe9ae3a384dc550ac1d8d0d08c423cab9c58c5334"' :
                                            'id="xs-controllers-links-module-PostsModule-b56e8e28979ee719eb766bcb9e5203f1586d7c6c047f15c69dad6047c34071f6bc46faf9f50aba63bcd342cfe9ae3a384dc550ac1d8d0d08c423cab9c58c5334"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostsModule-b56e8e28979ee719eb766bcb9e5203f1586d7c6c047f15c69dad6047c34071f6bc46faf9f50aba63bcd342cfe9ae3a384dc550ac1d8d0d08c423cab9c58c5334"' : 'data-target="#xs-injectables-links-module-PostsModule-b56e8e28979ee719eb766bcb9e5203f1586d7c6c047f15c69dad6047c34071f6bc46faf9f50aba63bcd342cfe9ae3a384dc550ac1d8d0d08c423cab9c58c5334"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-b56e8e28979ee719eb766bcb9e5203f1586d7c6c047f15c69dad6047c34071f6bc46faf9f50aba63bcd342cfe9ae3a384dc550ac1d8d0d08c423cab9c58c5334"' :
                                        'id="xs-injectables-links-module-PostsModule-b56e8e28979ee719eb766bcb9e5203f1586d7c6c047f15c69dad6047c34071f6bc46faf9f50aba63bcd342cfe9ae3a384dc550ac1d8d0d08c423cab9c58c5334"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-822ef77fda097d47c57c880a638adddf0c9fa8cf0ff3653604a7026f3d3557f7b21e4ea4118b46fa0377f02be90097ff79d418111a10f7524d24ee07e04a9eb7"' : 'data-target="#xs-injectables-links-module-PrismaModule-822ef77fda097d47c57c880a638adddf0c9fa8cf0ff3653604a7026f3d3557f7b21e4ea4118b46fa0377f02be90097ff79d418111a10f7524d24ee07e04a9eb7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-822ef77fda097d47c57c880a638adddf0c9fa8cf0ff3653604a7026f3d3557f7b21e4ea4118b46fa0377f02be90097ff79d418111a10f7524d24ee07e04a9eb7"' :
                                        'id="xs-injectables-links-module-PrismaModule-822ef77fda097d47c57c880a638adddf0c9fa8cf0ff3653604a7026f3d3557f7b21e4ea4118b46fa0377f02be90097ff79d418111a10f7524d24ee07e04a9eb7"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-a9ca43578fa90b0ee61efa67faff64ed1896648ce735d591ed671446d99e9685eab3b2741e3b3def64edfcc4e179d89d4975ae50daad2efe36052dc2cf4134ba"' : 'data-target="#xs-controllers-links-module-UsersModule-a9ca43578fa90b0ee61efa67faff64ed1896648ce735d591ed671446d99e9685eab3b2741e3b3def64edfcc4e179d89d4975ae50daad2efe36052dc2cf4134ba"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a9ca43578fa90b0ee61efa67faff64ed1896648ce735d591ed671446d99e9685eab3b2741e3b3def64edfcc4e179d89d4975ae50daad2efe36052dc2cf4134ba"' :
                                            'id="xs-controllers-links-module-UsersModule-a9ca43578fa90b0ee61efa67faff64ed1896648ce735d591ed671446d99e9685eab3b2741e3b3def64edfcc4e179d89d4975ae50daad2efe36052dc2cf4134ba"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-a9ca43578fa90b0ee61efa67faff64ed1896648ce735d591ed671446d99e9685eab3b2741e3b3def64edfcc4e179d89d4975ae50daad2efe36052dc2cf4134ba"' : 'data-target="#xs-injectables-links-module-UsersModule-a9ca43578fa90b0ee61efa67faff64ed1896648ce735d591ed671446d99e9685eab3b2741e3b3def64edfcc4e179d89d4975ae50daad2efe36052dc2cf4134ba"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a9ca43578fa90b0ee61efa67faff64ed1896648ce735d591ed671446d99e9685eab3b2741e3b3def64edfcc4e179d89d4975ae50daad2efe36052dc2cf4134ba"' :
                                        'id="xs-injectables-links-module-UsersModule-a9ca43578fa90b0ee61efa67faff64ed1896648ce735d591ed671446d99e9685eab3b2741e3b3def64edfcc4e179d89d4975ae50daad2efe36052dc2cf4134ba"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminController.html" data-type="entity-link" >AdminController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AdminUsersController.html" data-type="entity-link" >AdminUsersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ConversationsController.html" data-type="entity-link" >ConversationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FileController.html" data-type="entity-link" >FileController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MathController.html" data-type="entity-link" >MathController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MessagesGateway.html" data-type="entity-link" >MessagesGateway</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/OauthController.html" data-type="entity-link" >OauthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthService.html" data-type="entity-link" >AuthService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentEntity.html" data-type="entity-link" >CommentEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConversationEntity.html" data-type="entity-link" >ConversationEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConversationsService.html" data-type="entity-link" >ConversationsService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateConversationDto.html" data-type="entity-link" >CreateConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMessageDto.html" data-type="entity-link" >CreateMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteCommentDto.html" data-type="entity-link" >DeleteCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteConversationDto.html" data-type="entity-link" >DeleteConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteMessageDto.html" data-type="entity-link" >DeleteMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteOneAdminConversationDto.html" data-type="entity-link" >DeleteOneAdminConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteOnePost.html" data-type="entity-link" >DeleteOnePost</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionFilter.html" data-type="entity-link" >ExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileService.html" data-type="entity-link" >FileService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilesService.html" data-type="entity-link" >FilesService</a>
                            </li>
                            <li class="link">
                                <a href="classes/fullNameValidator.html" data-type="entity-link" >fullNameValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllConversationDto.html" data-type="entity-link" >GetAllConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetOneConversationDto.html" data-type="entity-link" >GetOneConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/imageValidator.html" data-type="entity-link" >imageValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageEntity.html" data-type="entity-link" >MessageEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/NatsStrategy.html" data-type="entity-link" >NatsStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDto.html" data-type="entity-link" >PaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/passwordValidator.html" data-type="entity-link" >passwordValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/phoneNumberValidator.html" data-type="entity-link" >phoneNumberValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostEntity.html" data-type="entity-link" >PostEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostsService.html" data-type="entity-link" >PostsService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileEntity.html" data-type="entity-link" >ProfileEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReactionsPost.html" data-type="entity-link" >ReactionsPost</a>
                            </li>
                            <li class="link">
                                <a href="classes/RtGuard.html" data-type="entity-link" >RtGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignupDto.html" data-type="entity-link" >SignupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCommentTextDto.html" data-type="entity-link" >UpdateCommentTextDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateConversationDto.html" data-type="entity-link" >UpdateConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMembersConversationDto.html" data-type="entity-link" >UpdateMembersConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePasswordDto.html" data-type="entity-link" >UpdatePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRolesConversationDto.html" data-type="entity-link" >UpdateRolesConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserAvatarDto.html" data-type="entity-link" >UpdateUserAvatarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserCoverDto.html" data-type="entity-link" >UpdateUserCoverDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserProfileDto.html" data-type="entity-link" >UpdateUserProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/usenameValidator.html" data-type="entity-link" >usenameValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersService.html" data-type="entity-link" >UsersService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AtGuard.html" data-type="entity-link" >AtGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AtStrategy.html" data-type="entity-link" >AtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConversationsService.html" data-type="entity-link" >ConversationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorsInterceptor.html" data-type="entity-link" >ErrorsInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcludeNullInterceptor.html" data-type="entity-link" >ExcludeNullInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExistedUserMiddleware.html" data-type="entity-link" >ExistedUserMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacebookStrategy.html" data-type="entity-link" >FacebookStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link" >GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpCacheInterceptor.html" data-type="entity-link" >HttpCacheInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerContextMiddleware.html" data-type="entity-link" >LoggerContextMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerService.html" data-type="entity-link" >LoggerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessagesService.html" data-type="entity-link" >MessagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OauthService.html" data-type="entity-link" >OauthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseIntPipe.html" data-type="entity-link" >ParseIntPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RtStrategy.html" data-type="entity-link" >RtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThrottlerBehindProxyGuard.html" data-type="entity-link" >ThrottlerBehindProxyGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidationPipe.html" data-type="entity-link" >ValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WsThrottlerGuard.html" data-type="entity-link" >WsThrottlerGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Alert.html" data-type="entity-link" >Alert</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlertOptions.html" data-type="entity-link" >AlertOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IApp.html" data-type="entity-link" >IApp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISwaggerOptions.html" data-type="entity-link" >ISwaggerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NatsSubscriber.html" data-type="entity-link" >NatsSubscriber</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});