(function() {
    'use strict';

    angular
        .module('app.dialogue')
        .service('dialogueService', dialogueService);

    dialogueService.$inject = ['progressService'];

    /* @ngInject */
    function dialogueService(progressService) {
        var vm = this;
        vm.locationText = '';
        vm.progress = progressService.progress;

        vm.Dialogue = function() {
            this.initDialogue = function() {
                return 'introduction';
            }
        };

        vm.wizard = new vm.Dialogue;
        vm.wizard.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'wizard introduction',
                }
            }
            return dialogue;
        }

        vm.treeKing = new vm.Dialogue;
        vm.treeKing.initDialogue = function() {
            console.log(vm.progress.treeKingIntro)
            if (!vm.progress.treeKingIntro) {
                return 'introduction';
            }
            else {
                return 'question';
            }
        }
        vm.treeKing.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Greetings, I am King Treemaster.  Welcome to our city, outsider.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingIntro = true;
                    }
                },
                question: {
                    text: 'Now, what can I do for you?',
                    buttons : {
                        workAccepted: {
                            text: 'Missing travelers',
                            next: 'askWorkAccepted',
                            master: 'treeKing',
                            active: vm.progress.treeKingWorkAccept
                        },
                        work: {
                            text: 'Any work you need done?',
                            next: 'askWork',
                            master: 'treeKing',
                            active: !vm.progress.treeKingWorkAccept
                        },
                        rumor: {
                            text: 'Rumors in the area',
                            next: 'askRumor',
                            master: 'treeKing',
                            active: true
                        },
                        compliment: {
                            text: 'Compliment',
                            next: 'askCompliment',
                            master: 'treeKing',
                            active: vm.progress.treeKingCompliment
                        },
                        bridge: {
                            text: 'Build Bridge',
                            next: 'askBuild',
                            master: 'treeKing',
                            active: vm.progress.treeKingWorkHandIn
                        }
                    }
                },
                askBuild: {
                    text: 'bridge text'
                },
                askRumor: {
                    text: 'rumor text',
                    next: 'question',
                    master: 'treeKing',
                    continue: true
                },
                askCompliment: {
                    text: 'Flattery will get you nowhere with me, outsider.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingCompliment = false;
                        vm.treeKing.dialogue = vm.treeKing.setDialogue();
                    }
                },
                askWork: {
                    text: 'Yes, there are some things we need done.  Lately we have had an issue with travelers going missing in the forest. It has caused our trade to slow down and people are starting to feel the shortage of goods.  One of our scouts reported seeing something to the desert north of the forest, perhaps you can start there?',
                    buttons: {
                        accept: {
                            text: 'I will find the missing villagers',
                            next: 'askWorkAccept',
                            master: 'treeKing',
                            active: true
                        },
                        refuse: {
                            text: 'This type of work is beneath me',
                            next: 'askWorkRefuse',
                            master: 'treeKing',
                            active: true
                        }
                    }
                },
                askWorkAccept: {
                    text: 'Great! Please let me know if you find anything.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingWorkAccept = true;
                        vm.progress.levels.desert = true;
                        vm.treeKing.dialogue = vm.treeKing.setDialogue();
                    }
                },
                askWorkRefuse: {
                    text: 'Well.  It is unfortunate you feel that way, however, this is the only work I have for an outsider.',
                    buttons: {
                        accept: {
                            text: 'Alright.. I will search the desert.',
                            next: 'askWorkAccept',
                            master: 'treeKing',
                            active: true
                        }
                    }
                },
                askWorkAccepted: {
                    text: 'Any news from your search in the desert?',
                    buttons: {
                        yes: {
                            text: 'news',
                            next: 'askWorkComplete',
                            master: 'treeKing',
                            active: vm.progress.levels.ruinsCleared
                        },
                        no: {
                            text: 'Not yet',
                            next: 'askWorkIncomplete',
                            master: 'treeKing',
                            active: !vm.progress.levels.ruinsCleared
                        }
                    }
                },
                askWorkComplete: {
                    text: 'finish quest',
                    next: 'question',
                    master: 'treeKing',
                    continue: true,
                    special: function() {
                        vm.progress.treeKingWorkHandIn = true;
                    }
                },
                askWorkIncomplete: {
                    text: 'I see.  Please act with haste, I dont want anyone else to go missing.',
                    next: 'question',
                    master: 'treeKing',
                    continue: true
                }
            }
            return dialogue;
        }


        vm.slumThugs = new vm.Dialogue;
        vm.slumThugs.initDialogue = function() {
            if (vm.progress.slumBossMet) {
                return 'boss';
            }
            else {
                return 'introduction';
            }
            console.log('poop test');
        }
        vm.slumThugs.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'Hey! You dont belong here. Beat it!',
                    buttons: {
                        leave: {
                            text: 'Sorry I will leave!',
                            next: 'sorryLeave',
                            master: 'slumThugs',
                            active: true
                        },
                        threaten: {
                            text: 'I go where I want.',
                            next: 'threaten',
                            master: 'slumThugs',
                            active: true
                        },
                        question: {
                            text: 'What is going on here?',
                            next: 'question',
                            master: 'slumThugs',
                            active: true
                        }
                    }
                },
                sorryLeave: {
                    text: 'Thats what I thought.  Now beat it scrub!',
                },
                threaten: {
                    text: 'Oh man I like this guy! Lets take him to meet the boss!',
                    continue: true,
                    next: 'introduction',
                    master: 'slumThugsBoss',
                    special: function() {
                        vm.progress.slumBossMet = true;
                        console.log(vm.progress.slumBossMet);
                    }
                },
                question: {
                    text: 'Nosy huh?  Lets let the boss deal with him!',
                    continue: true,
                    next: 'introductionNosy',
                    master: 'slumThugsBoss'
                },
                boss: {
                    text: 'You need to see the boss again? Lets go.',
                    continue: true,
                    next: 'bossReturn',
                    master: 'slumThugsBoss',
                    special: function() {
                        vm.progress.slumBossMet = true;
                        console.log(vm.progress.slumBossMet);
                    }
                }
            }
            return dialogue;
        };

        vm.slumThugsBoss = new vm.Dialogue;
        vm.slumThugsBoss.setDialogue = function() {
            var dialogue = {
                introduction: {
                    text: 'You think you have what it takes huh? Well lets see it then.',
                    buttons: {
                        confused: {
                            text: 'I have no idea what you mean',
                            next: 'confused',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        confident: {
                            text: 'Yeah I do! Lets do this.',
                            next: 'confident',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        threaten: {
                            text: 'I will mess you up old man!',
                            next: 'threaten',
                            master: 'slumThugsBoss',
                            active: true
                        }
                    }
                },
                introductionNosy: {
                    text: 'You like going around asking questions huh?  You think you have what it takes?',
                    buttons: {
                        confused: {
                            text: 'Takes to do what?',
                            next: 'confused',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        confident: {
                            text: 'Yeah I do! Lets do this.',
                            next: 'confident',
                            master: 'slumThugsBoss',
                            active: true
                        },
                        threaten: {
                            text: 'I will mess you up old man!',
                            next: 'threaten',
                            master: 'slumThugsBoss',
                            active: true
                        }
                    }
                },
                confused: {

                },
                confident: {
                    text: '',
                    continue: true,
                    active: true,
                    level: 'shroom'
                },
                threaten: {

                },
                bossReturn: {
                    text: 'Back Again? Show me what you got.',
                    active: true
                }
            }
            return dialogue;
        }


        vm.initAllDialogues = function() {
            vm.treeKing.dialogue = vm.treeKing.setDialogue();
            vm.slumThugs.dialogue = vm.slumThugs.setDialogue();
            vm.slumThugsBoss.dialogue = vm.slumThugsBoss.setDialogue();
            vm.wizard.dialogue = vm.wizard.setDialogue();
        }


        ////////////////

        function func() {
        }
    }
})();