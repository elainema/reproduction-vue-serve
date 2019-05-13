 ;(function($){
		'use strict';
		// ���Ĭ������
		var defaultOptions = {
			
		};

		// ���ʵ���������������û���������
		$.fn.accessSearch = function (options) {
			// �ϲ��û�����
			options = $.extend(defaultOptions, options);

			return this.each(function(index, node){
				var _input = $(this);
				var _select = _input.next('select');
				var _is_multi_select = _select.attr('multiple') || false;
				var _ul = $('<ul>', {
					'class': 'sel-search-list'
				});

				// �������ɵ��б�
				// _input.after(_ul);
				$('body').append(_ul);

				// �ṩ�б�ر�
				$(document).click(function(e){
					_ul.empty().hide();
				})

				// input�¼��󶨣���Ҫ�������벿��
				_input.unbind().on('keyup', function(e){
					var _pos = _input.offset();
					var _style = 'top:'+ (_input.outerHeight() + _pos.top) +'px;left:'+ _pos.left +'px;';
					var _input_val = _input.val();
					var _input_len = _input_val.length;

					// ÿ�������б��λ�ò�����б�
					_ul.attr('style', _style).empty().hide();

					if (_input_len > 1) {
						$('option', _select).each(function(i, n){
							_input_val = _input_val.toLowerCase();
							var _opt_text = $(n).text();
							var _opt_search_text = _opt_text.toLowerCase();
							var _opt_val = $(n).val();
							var _regexKey = new RegExp(_input_val, 'igm');
							if (_opt_search_text.indexOf(_input_val) != -1) {
								var _replaced_text = _opt_text.replace(_regexKey, function(){
									return '<strong>'+ arguments[0] +'</strong>'
								})
								$('<li>', {
									'data-opt-value': _opt_val,
									'data-opt-index': i
								}).html(_replaced_text).appendTo(_ul);
								_ul.show();
							}
						})
					}
				})

				// �б��¼���
				_ul.unbind().on('click', 'li', function(e){
					e.stopPropagation();
					e.preventDefault();
					var _self = $(this);
					var _sel_val = _self.attr('data-opt-value');
					$('option[value='+ _sel_val +']', _select).siblings().prop('selected', false).end().prop('selected', true);
					_select.focus().val(_sel_val).trigger('click');
					_ul.empty().hide();
					if (_is_multi_select) {
						$('option[value='+ _sel_val +']', _select).prop('selected', true);
						$('option:selected', _select).prependTo(_select);
						_select.scrollTop(0);
					}
				})
			})
		}
	})(jQuery);