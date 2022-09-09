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
                                            'data-target="#controllers-links-module-AppModule-9d675b91b0d78dc7eff13ac6ee7f50804e0673cbe7169246eea65136ca7e10d15b6c41d012a40501f2d3da2caf25065543ccf05d014a4a77284849d8c4af401c"' : 'data-target="#xs-controllers-links-module-AppModule-9d675b91b0d78dc7eff13ac6ee7f50804e0673cbe7169246eea65136ca7e10d15b6c41d012a40501f2d3da2caf25065543ccf05d014a4a77284849d8c4af401c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-9d675b91b0d78dc7eff13ac6ee7f50804e0673cbe7169246eea65136ca7e10d15b6c41d012a40501f2d3da2caf25065543ccf05d014a4a77284849d8c4af401c"' :
                                            'id="xs-controllers-links-module-AppModule-9d675b91b0d78dc7eff13ac6ee7f50804e0673cbe7169246eea65136ca7e10d15b6c41d012a40501f2d3da2caf25065543ccf05d014a4a77284849d8c4af401c"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-9d675b91b0d78dc7eff13ac6ee7f50804e0673cbe7169246eea65136ca7e10d15b6c41d012a40501f2d3da2caf25065543ccf05d014a4a77284849d8c4af401c"' : 'data-target="#xs-injectables-links-module-AppModule-9d675b91b0d78dc7eff13ac6ee7f50804e0673cbe7169246eea65136ca7e10d15b6c41d012a40501f2d3da2caf25065543ccf05d014a4a77284849d8c4af401c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9d675b91b0d78dc7eff13ac6ee7f50804e0673cbe7169246eea65136ca7e10d15b6c41d012a40501f2d3da2caf25065543ccf05d014a4a77284849d8c4af401c"' :
                                        'id="xs-injectables-links-module-AppModule-9d675b91b0d78dc7eff13ac6ee7f50804e0673cbe7169246eea65136ca7e10d15b6c41d012a40501f2d3da2caf25065543ccf05d014a4a77284849d8c4af401c"' }>
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
                                            'data-target="#controllers-links-module-AuthModule-b203b71b9218f1673ff8c6fc07a6640aaf5d0d065f0d6853825267f3d34129d6364e314a086fa0ec22b557b5b16c26bd702950ce5dfb91a0546ff275e877e005"' : 'data-target="#xs-controllers-links-module-AuthModule-b203b71b9218f1673ff8c6fc07a6640aaf5d0d065f0d6853825267f3d34129d6364e314a086fa0ec22b557b5b16c26bd702950ce5dfb91a0546ff275e877e005"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b203b71b9218f1673ff8c6fc07a6640aaf5d0d065f0d6853825267f3d34129d6364e314a086fa0ec22b557b5b16c26bd702950ce5dfb91a0546ff275e877e005"' :
                                            'id="xs-controllers-links-module-AuthModule-b203b71b9218f1673ff8c6fc07a6640aaf5d0d065f0d6853825267f3d34129d6364e314a086fa0ec22b557b5b16c26bd702950ce5dfb91a0546ff275e877e005"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-b203b71b9218f1673ff8c6fc07a6640aaf5d0d065f0d6853825267f3d34129d6364e314a086fa0ec22b557b5b16c26bd702950ce5dfb91a0546ff275e877e005"' : 'data-target="#xs-injectables-links-module-AuthModule-b203b71b9218f1673ff8c6fc07a6640aaf5d0d065f0d6853825267f3d34129d6364e314a086fa0ec22b557b5b16c26bd702950ce5dfb91a0546ff275e877e005"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b203b71b9218f1673ff8c6fc07a6640aaf5d0d065f0d6853825267f3d34129d6364e314a086fa0ec22b557b5b16c26bd702950ce5dfb91a0546ff275e877e005"' :
                                        'id="xs-injectables-links-module-AuthModule-b203b71b9218f1673ff8c6fc07a6640aaf5d0d065f0d6853825267f3d34129d6364e314a086fa0ec22b557b5b16c26bd702950ce5dfb91a0546ff275e877e005"' }>
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
                                            'data-target="#controllers-links-module-ConversationsModule-ec82375257238fb138a395f320efcad7e1142a374e1cb078b91a079df87ffc19ddfb22ce2dd6df1431e124f81d67db59c838901848a757332105db9c5d43e888"' : 'data-target="#xs-controllers-links-module-ConversationsModule-ec82375257238fb138a395f320efcad7e1142a374e1cb078b91a079df87ffc19ddfb22ce2dd6df1431e124f81d67db59c838901848a757332105db9c5d43e888"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConversationsModule-ec82375257238fb138a395f320efcad7e1142a374e1cb078b91a079df87ffc19ddfb22ce2dd6df1431e124f81d67db59c838901848a757332105db9c5d43e888"' :
                                            'id="xs-controllers-links-module-ConversationsModule-ec82375257238fb138a395f320efcad7e1142a374e1cb078b91a079df87ffc19ddfb22ce2dd6df1431e124f81d67db59c838901848a757332105db9c5d43e888"' }>
                                            <li class="link">
                                                <a href="controllers/ConversationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConversationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ConversationsModule-ec82375257238fb138a395f320efcad7e1142a374e1cb078b91a079df87ffc19ddfb22ce2dd6df1431e124f81d67db59c838901848a757332105db9c5d43e888"' : 'data-target="#xs-injectables-links-module-ConversationsModule-ec82375257238fb138a395f320efcad7e1142a374e1cb078b91a079df87ffc19ddfb22ce2dd6df1431e124f81d67db59c838901848a757332105db9c5d43e888"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConversationsModule-ec82375257238fb138a395f320efcad7e1142a374e1cb078b91a079df87ffc19ddfb22ce2dd6df1431e124f81d67db59c838901848a757332105db9c5d43e888"' :
                                        'id="xs-injectables-links-module-ConversationsModule-ec82375257238fb138a395f320efcad7e1142a374e1cb078b91a079df87ffc19ddfb22ce2dd6df1431e124f81d67db59c838901848a757332105db9c5d43e888"' }>
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
                                <a href="modules/MessagesModule.html" data-type="entity-link" >MessagesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MessagesModule-6f70486121e8989d8a15dbb6bb76d2befe6bddb2ea207f870fcc8ac90968f28ace2096334d9ad2b1d0a3f89fa59d7f778bcc496a45bd4b78c278ebc565ff4a0e"' : 'data-target="#xs-injectables-links-module-MessagesModule-6f70486121e8989d8a15dbb6bb76d2befe6bddb2ea207f870fcc8ac90968f28ace2096334d9ad2b1d0a3f89fa59d7f778bcc496a45bd4b78c278ebc565ff4a0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessagesModule-6f70486121e8989d8a15dbb6bb76d2befe6bddb2ea207f870fcc8ac90968f28ace2096334d9ad2b1d0a3f89fa59d7f778bcc496a45bd4b78c278ebc565ff4a0e"' :
                                        'id="xs-injectables-links-module-MessagesModule-6f70486121e8989d8a15dbb6bb76d2befe6bddb2ea207f870fcc8ac90968f28ace2096334d9ad2b1d0a3f89fa59d7f778bcc496a45bd4b78c278ebc565ff4a0e"' }>
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
                                            'data-target="#controllers-links-module-OauthModule-175b32fda7ef02f6806f2305b55116962b8efe77bd663cbc19301f4ddf3432fd8b57aa3cfe7d44e40006dc0c89f87a2f2c7733832ee21afd86798ef9ef038e59"' : 'data-target="#xs-controllers-links-module-OauthModule-175b32fda7ef02f6806f2305b55116962b8efe77bd663cbc19301f4ddf3432fd8b57aa3cfe7d44e40006dc0c89f87a2f2c7733832ee21afd86798ef9ef038e59"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OauthModule-175b32fda7ef02f6806f2305b55116962b8efe77bd663cbc19301f4ddf3432fd8b57aa3cfe7d44e40006dc0c89f87a2f2c7733832ee21afd86798ef9ef038e59"' :
                                            'id="xs-controllers-links-module-OauthModule-175b32fda7ef02f6806f2305b55116962b8efe77bd663cbc19301f4ddf3432fd8b57aa3cfe7d44e40006dc0c89f87a2f2c7733832ee21afd86798ef9ef038e59"' }>
                                            <li class="link">
                                                <a href="controllers/OauthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OauthModule-175b32fda7ef02f6806f2305b55116962b8efe77bd663cbc19301f4ddf3432fd8b57aa3cfe7d44e40006dc0c89f87a2f2c7733832ee21afd86798ef9ef038e59"' : 'data-target="#xs-injectables-links-module-OauthModule-175b32fda7ef02f6806f2305b55116962b8efe77bd663cbc19301f4ddf3432fd8b57aa3cfe7d44e40006dc0c89f87a2f2c7733832ee21afd86798ef9ef038e59"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OauthModule-175b32fda7ef02f6806f2305b55116962b8efe77bd663cbc19301f4ddf3432fd8b57aa3cfe7d44e40006dc0c89f87a2f2c7733832ee21afd86798ef9ef038e59"' :
                                        'id="xs-injectables-links-module-OauthModule-175b32fda7ef02f6806f2305b55116962b8efe77bd663cbc19301f4ddf3432fd8b57aa3cfe7d44e40006dc0c89f87a2f2c7733832ee21afd86798ef9ef038e59"' }>
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
                                            'data-target="#controllers-links-module-PostsModule-38b6d05b9da719af5dfc4dad045e90dd1feda3aade8fdccc0c3be1699a1040d2d9056f00bc467b1d0d49014b5b7fb6e66efd97444eb8625846cf0f12741e59c8"' : 'data-target="#xs-controllers-links-module-PostsModule-38b6d05b9da719af5dfc4dad045e90dd1feda3aade8fdccc0c3be1699a1040d2d9056f00bc467b1d0d49014b5b7fb6e66efd97444eb8625846cf0f12741e59c8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-38b6d05b9da719af5dfc4dad045e90dd1feda3aade8fdccc0c3be1699a1040d2d9056f00bc467b1d0d49014b5b7fb6e66efd97444eb8625846cf0f12741e59c8"' :
                                            'id="xs-controllers-links-module-PostsModule-38b6d05b9da719af5dfc4dad045e90dd1feda3aade8fdccc0c3be1699a1040d2d9056f00bc467b1d0d49014b5b7fb6e66efd97444eb8625846cf0f12741e59c8"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostsModule-38b6d05b9da719af5dfc4dad045e90dd1feda3aade8fdccc0c3be1699a1040d2d9056f00bc467b1d0d49014b5b7fb6e66efd97444eb8625846cf0f12741e59c8"' : 'data-target="#xs-injectables-links-module-PostsModule-38b6d05b9da719af5dfc4dad045e90dd1feda3aade8fdccc0c3be1699a1040d2d9056f00bc467b1d0d49014b5b7fb6e66efd97444eb8625846cf0f12741e59c8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-38b6d05b9da719af5dfc4dad045e90dd1feda3aade8fdccc0c3be1699a1040d2d9056f00bc467b1d0d49014b5b7fb6e66efd97444eb8625846cf0f12741e59c8"' :
                                        'id="xs-injectables-links-module-PostsModule-38b6d05b9da719af5dfc4dad045e90dd1feda3aade8fdccc0c3be1699a1040d2d9056f00bc467b1d0d49014b5b7fb6e66efd97444eb8625846cf0f12741e59c8"' }>
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
                                        'data-target="#injectables-links-module-PrismaModule-d1eb54ea2b5c1c4b6b9ac2e279a1ecd7de59c4f964cf3d2d789d7cb641a3630649c5063d3e122861f635fbe918aff295bcf67b21636ffac225f456c285c29ba9"' : 'data-target="#xs-injectables-links-module-PrismaModule-d1eb54ea2b5c1c4b6b9ac2e279a1ecd7de59c4f964cf3d2d789d7cb641a3630649c5063d3e122861f635fbe918aff295bcf67b21636ffac225f456c285c29ba9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-d1eb54ea2b5c1c4b6b9ac2e279a1ecd7de59c4f964cf3d2d789d7cb641a3630649c5063d3e122861f635fbe918aff295bcf67b21636ffac225f456c285c29ba9"' :
                                        'id="xs-injectables-links-module-PrismaModule-d1eb54ea2b5c1c4b6b9ac2e279a1ecd7de59c4f964cf3d2d789d7cb641a3630649c5063d3e122861f635fbe918aff295bcf67b21636ffac225f456c285c29ba9"' }>
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
                                            'data-target="#controllers-links-module-UsersModule-c5c9e7db5788e79980c9bf8b9271a1eb2219f907a8e475b6a46af83d387c6af99308b9719fe9bc645c7b807d50dd4072b470ff2bd19c522e4debc6779e97bb60"' : 'data-target="#xs-controllers-links-module-UsersModule-c5c9e7db5788e79980c9bf8b9271a1eb2219f907a8e475b6a46af83d387c6af99308b9719fe9bc645c7b807d50dd4072b470ff2bd19c522e4debc6779e97bb60"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c5c9e7db5788e79980c9bf8b9271a1eb2219f907a8e475b6a46af83d387c6af99308b9719fe9bc645c7b807d50dd4072b470ff2bd19c522e4debc6779e97bb60"' :
                                            'id="xs-controllers-links-module-UsersModule-c5c9e7db5788e79980c9bf8b9271a1eb2219f907a8e475b6a46af83d387c6af99308b9719fe9bc645c7b807d50dd4072b470ff2bd19c522e4debc6779e97bb60"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-c5c9e7db5788e79980c9bf8b9271a1eb2219f907a8e475b6a46af83d387c6af99308b9719fe9bc645c7b807d50dd4072b470ff2bd19c522e4debc6779e97bb60"' : 'data-target="#xs-injectables-links-module-UsersModule-c5c9e7db5788e79980c9bf8b9271a1eb2219f907a8e475b6a46af83d387c6af99308b9719fe9bc645c7b807d50dd4072b470ff2bd19c522e4debc6779e97bb60"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c5c9e7db5788e79980c9bf8b9271a1eb2219f907a8e475b6a46af83d387c6af99308b9719fe9bc645c7b807d50dd4072b470ff2bd19c522e4debc6779e97bb60"' :
                                        'id="xs-injectables-links-module-UsersModule-c5c9e7db5788e79980c9bf8b9271a1eb2219f907a8e475b6a46af83d387c6af99308b9719fe9bc645c7b807d50dd4072b470ff2bd19c522e4debc6779e97bb60"' }>
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
                                <a href="classes/DeleteOneAdminConversationDto.html" data-type="entity-link" >DeleteOneAdminConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteOnePost.html" data-type="entity-link" >DeleteOnePost</a>
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
                                <a href="classes/MessagesGateway.html" data-type="entity-link" >MessagesGateway</a>
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
                                <a href="classes/UpdateMessageDto.html" data-type="entity-link" >UpdateMessageDto</a>
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
                                    <a href="injectables/ErrorsIntereptor.html" data-type="entity-link" >ErrorsIntereptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExistedUserMiddleware.html" data-type="entity-link" >ExistedUserMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GithubGuard.html" data-type="entity-link" >GithubGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GithubStrategy.html" data-type="entity-link" >GithubStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link" >GoogleStrategy</a>
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
                                <a href="interfaces/ISwaggerOptions.html" data-type="entity-link" >ISwaggerOptions</a>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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