// Code goes here
$(document).ready(function() {
    $('#topic-select').on('change', function() {
        $('#main-container').empty();
        $('#go-button').attr('disabled', 'disabled');
        var selected = $('#topic-select').val();
        if (selected) {
            var cards_total = ALL_TOPICS[selected].length;
            var cards_disabled = ALL_TOPICS[selected].filter(function(element) {
                return element.disabled;
            }).length;
            var cards_disabled_percentage = cards_total != 0 ? ((cards_disabled / cards_total) * 100).toFixed(0) : '';
            statisticsTemplateContext.cards_total = cards_total;
            statisticsTemplateContext.cards_disabled = cards_disabled;
            statisticsTemplateContext.cards_disabled_percentage = cards_disabled_percentage;
            var html = statisticsTemplate(statisticsTemplateContext);
            $('#main-container').html(html);
            $('#go-button').removeAttr('disabled');
        }
    });

    $('#go-button').on('click', function() {
        $('#main-container').empty();
        var selected = $('#topic-select').val();
        if (selected) {
            generateRandomQuestions(ALL_TOPICS[selected]);
            var html = cardsTemplate(cardsTemplateContext);
            $('#main-container').html(html);
        }
    });

    $('#go-button').attr('disabled', 'disabled');

    // Cards Template Handlebars spacific variables 
    var cardsTemplateSource = $("#cards-template").html();
    var cardsTemplate = Handlebars.compile(cardsTemplateSource);
    var cardsTemplateContext = {
        questions: []
    };

    // Statistics Template Handlebars spacific variables 
    var statisticsTemplateSource = $("#statistics-template").html();
    var statisticsTemplate = Handlebars.compile(statisticsTemplateSource);
    var statisticsTemplateContext = {
        cards_total: '',
        cards_disabled: '',
        cards_disabled_percentage: ''
    };

    function generateRandomQuestions(topicArray) {
        var clonedArray = $.extend(true, [], topicArray).filter(function(element) {
            return !element.disabled;
        });
        cardsTemplateContext.questions = []
        var i = 15;
        while (i-- && clonedArray.length >= 1) {
            var random = Math.floor(Math.random() * clonedArray.length);
            var data = clonedArray[random];
            cardsTemplateContext.questions.push(data);
            clonedArray.splice(random, 1);
        }
    }
});

Handlebars.registerHelper("inc", function(inindex) {
    return inindex + 1
});

Handlebars.registerHelper('limit', function(arr, limit) {
    if (!Array.isArray(arr)) { return []; }
    return arr.slice(0, limit);
});