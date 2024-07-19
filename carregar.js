//import conf from "configuracoes.json" assert { "type": "json" };
var tempo_espera = 10;
var interval;
var time_start_loading;
var conf = {
    "frases_loading": [
        "Identificando famílias e domicílios para uma gestão social mais eficiente ...",
		"Promovendo a inclusão social através de dados atualizados e precisos ...",
		"Facilitando diagnósticos sociais para um futuro mais inclusivo ...",
		"Analisando dados para fortalecer a Busca Ativa e a inclusão social! Aguarde ...",
		"Utilizando inteligência de dados para qualificar o Cadastro Único! Aguarde ...",
		"Preparando insights sociais… Porque cada detalhe conta! Aguarde ...",
		"Preparando visualizações interativas! Aguarde ...",
		"Aguarde, estamos cruzando informações ...",
		"Transformando dados em inteligência ...",
		"Conectando você aos dados do Cadastro Único ...",
		"Preparando análises sociais detalhadas ...",
		"Visualizando caminhos para o desenvolvimento social ...",
		"Aguarde, estamos desvendando conexões sociais importantes ..."
    ],
	"frases_avaliacao": [
        "Sua opinião é importante! Avalie nossa ferramenta e nos ajude a melhorar.",
		"Compartilhe sua experiência! Deixe uma avaliação e contribua para nosso desenvolvimento.",
		"Avaliações positivas nos motivam e as negativas nos fortalecem. Obrigado por dedicar um momento para avaliar!",
		"Se gostou, avalie! Sua opinião faz a diferença.",
		"<i>Feedback</i> é bem-vindo! Avalie e ajude-nos a ser mais úteis a sociedade.",
		"Sua avaliação é essencial para aprimorar nossa ferramenta. Compartilhe seus <i>insights</i> conosco.",
		"Agradecemos por dedicar um momento para avaliar. Seus comentários são valiosos.",
		"As avaliações estão abastecendo nossas ideias, faça parte da evolução do Observatório!",
		"Convidamos você a avaliar nossa ferramenta. Suas observações são bem-vindas.",		
		"Avaliações construtivas nos ajudam a servir melhor nossos cidadãos.",
		"Considere deixar uma avaliação. Isso nos ajuda a atender às necessidades da comunidade."
    ]
};

json_cookiebar = '[ \
{ \
    "lang": "", \
    "allOptOut": true, \
    "acceptButton": "", \
    "optInButton": "", \
    "optOutButton": "", \
    "infoText": "", \
    "mainTitle": "", \
    "lastUpdate": "", \
    "entryText": "", \
    "selectAll": false, \
    "allAlertMessage": "", \
    "closeLabel": "", \
    "lastUpdateLabel": "", \
    "cookieGroupsLabel": "", \
    "selectAllLabel": "", \
    "unselectAllLabel": "", \
    "selectAllGroupLabel": "", \
    "unselectAllGroupLabel": "", \
    "onLabel": "", \
    "offLabel": "", \
    "alwaysActiveLabel": "", \
    "cookieNameLabel": "", \
    "expiresLabel": "", \
    "domainLabel": "", \
    "enterpriseLabel": "", \
    "purposeLabel": "", \
    "descriptionLabel": "", \
    "cookieGroups": [ \
      { \
        "groupId": "", \
        "groupName": "", \
        "groupOptOut": false, \
        "groupSelected": false, \
        "groupAlertMessage": "", \
        "groupText": "", \
        "cookieList": [ \
          { \
            "cookieId": "", \
            "cookieOptOut": false, \
            "cookieSelected": false, \
            "alertMessage": "", \
            "cookieName": "", \
            "expires": "", \
            "domain": "s", \
            "entreprise": "", \
            "purpose": "", \
            "description": "" \
          }, \
        ] \
      }, \
    ], \
    "noteTitle": "", \
    "noteList": [ \
      { \
        "question": "", \
        "answer": "" \
      }, \
    ], \
    "links": [ \
      { \
        "name": "", \
        "url": "" \
      } \
    ] \
  } \
]';

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function detectMob() {
	const toMatch = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];

	return toMatch.some((toMatchItem) => {
		return navigator.userAgent.match(toMatchItem);
	});
}

const mobile = detectMob();

//Meses do ano
const meses = {
	1: "janeiro",
	2: "fevereiro",
	3: "março",
	4: "abril",
	5: "maio",
	6: "junho",
	7: "julho",
	8: "agosto",
	9: "setembro",
	10: "outubro",
	11: "novembro",
	12: "dezembro"
};

var html_observacao_filtro_cras = '<span style="padding:0px 5px;">Selecione apenas um município para habilitar o filtro por CRAS.</span>';

//Nomes dos campos
const campos_descricao = {
	anomes: "Ano e mês de referência",
	regiao: "Região",
	uf: "UF",
	sigla_uf: "UF",
	nome_uf: "UF",
	nome_municipio: "Município",
	uf_municipio: "Município",
	nome: "Nome do Cras",
	nome_cras: "Nome do Cras",
	co_est_cadastral_fam: "Estado cadastral da família",
	im_cadastro_atualizado: "Cadastro atualizado",
	im_faixa_renda_per_capita: "Faixa de renda per capita da família",
	im_faixa_renda_total: "Faixa de renda total da família",
	im_atualizacao: "Meses da última atualização cadastral",
	im_forma_coleta: "Cadastro por visita domiciliar",
	co_calcamento_domic_fam: "Tipo de calçamento do domicílio",
	co_local_domic_fam: "Situação do domicílio",
	co_especie_domic_fam: "Espécie do domicílio",
	co_iluminacao_domic_fam: "Tipo de iluminação do domicílio",
	im_agua_canalizada: "Água canalizada",
	im_calcamento: "Tipo de calçamento",
	im_especie_domicilio: "Espécie do domicílio",
	im_situacao_domicilio: "Situação do domicílio",
	im_forma_abastecimento_agua: "Forma de abastecimento de água",
	im_destino_lixo_domicilio: "Forma de destino do lixo",
	im_esgotamento_sanitario: "Forma de escoamento sanitário",
	im_arranjo_familiar: "Arranjo familiar",
	im_arranjo_por_qtd_membros: "Arranjo familiar por quantidade de membros",
	im_familias_faixa_etaria: "Perfil etário dos membros da família",
	im_pbf: "Beneficiária do Programa Bolsa Família",
	im_familia_indigena_quilombola: "Família indígena ou quilombola",
	im_material_paredes: "Material predominante das paredes",
	im_material_piso: "Material predominante do piso",
	im_tem_banheiro: "Tem banheiro",
	im_iluminacao: "Tipo de iluminação",
	im_tem_membros_racacor_branca: "Raça/cor branca",
	im_tem_membros_racacor_parda: "Raça/cor parda",
	im_tem_membros_racacor_preta: "Raça/cor preta",
	im_tem_membros_racacor_amarela: "Raça/cor amarela",
	im_tem_membros_racacor_indigena: "Raça/cor indígena",
	im_tem_membros_sexo_masculino: "Sexo masculino",
	im_tem_membros_sexo_feminino: "Sexo feminino",
	im_trabalho_infantil: "Trabalho infantil",
	im_tradicionais_sem: "Famílias em outros GPTEs",
	im_escoamento_sanitário: "Escoamento sanitário",
	im_forma_de_coleta_lixo: "Forma de coleta de lixo",
	im_familia_indigena: "Família indígena",
	im_familia_quilombola: "Família quilombola",
	im_tem_membros_ajuda_especializada: "Cuidado especializado",
	im_tem_membros_nao_recebe_cuidado: "Não recebe cuidado",
	im_tem_membros_deficiencia_mental: "Mental",
	im_tem_membros_deficiencia_sindrome_down: "Síndrome Down",
	im_tem_membros_transtorno_mental: "Transtorno mental",
	im_tem_membros_cuidado_familiar: "Cuidado familiar",
	im_tem_membros_cuidado_institucional: "Cuidado institucional",
	im_tem_membros_cuidado_outra_forma: "Cuidado de outra forma",
	im_tem_membros_cuidado_vizinho: "Cuidado de vizinho",
	im_tem_membros_deficiencia_baixa_visao: "Baixa visão",
	im_tem_membros_deficiencia_cegueira: "Cegueira",
	im_tem_membros_deficiencia_fisica: "Física",
	im_tem_membros_deficiencia_surdez_leve: "Surdez leve",
	im_tem_membros_deficiencia_surdez_severa: "Surdez severa",
	im_tem_membros_fundamental_completo: "Fundamental completo",
	im_tem_membros_fundamental_incompleto: "Fundamental incompleto",
	im_tem_membros_medio_incompleto: "Médio incompleto",
	im_tem_membros_seminstrucao: "Sem instrução",
	im_tem_membros_superior_incompleto_ou_mais: "Superior incompleto ou mais",
	im_agricultura: "Famílias com pelo menos uma pessoa que trabalha na agricultura, criação de animais, pesca ou coleta (extração vegetal)",
	im_atividade_de_trabalho_principal: "Atividade de trabalho principal",
	im_familia_pbf: "Recebe PBF",
	im_sabe_ler_escrever: "Sabe ler escrever",
	im_frequenta_escola: "Frequenta escola",
	im_tem_membros_medio_completo: "Médio completo",
	im_trabalha: "Família com pelo menos uma pessoa que trabalha",
	im_situacao_pessoal: "Famílias em situação de rua quanto ao número de membros",
	im_pelo_menos_um_membro_recebe_cuidado: "Famílias que pelo menos 1 membro recebe cuidados permanente de terceiros",
	im_pelo_menos_um_membro_com_deficiencia: "Famílias com pelo menos 1 membro com deficiência",
	im_frequenta_escola_rede_publica: "Frequenta rede pública",
	im_nao_frequenta_mas_ja_frequentou: "Não frequenta mas já frequentou",
	im_frequenta_escola_rede_particular: "Frequenta rede particular",
	im_nunca_frequentou: "Nunca frequentou",
	im_pelo_menos_um_membro_com_deficiencia: "Pelo menos um membro com deficiência",
	im_trabalhador_por_conta_propria: "Tem trabalhador por conta própria",
	im_trabalhador_temporario_em_area_rural: "Tem trabalhador temporário em área rural",
	im_empregado_sem_carteira_de_trabalho_assinada: "Tem empregado sem carteira de trabalho assinada",
	im_empregado_com_carteira_de_trabalho_assinada: "Tem empregado com carteira de trabalho assinada",
	im_trabalhador_domestico_sem_carteira_de_trabalho_assinada: "Tem trabalhador doméstico sem carteira de trabalho assinada",
	im_trabalhador_domestico_com_carteira_de_trabalho_assinada: "Tem trabalhador doméstico com carteira de trabalho assinada",
	im_trabalhador_não_remunerado: "Têm trabalho não remunerado",
	im_militar_ou_servidor_publico: "Têm Militar ou Servidor Público",
	im_empregador: "Tem empregador",
	im_estagiario: "Tem estagiário",
	im_aprendiz: "Tem aprendiz",
	im_familia_beneficiarios_bpc:"Recebe BPC",
	im_familia_aposentado:"Recebe aposentadoria, pensão ou BPC",
	im_familias_que_tem_pessoas_com_deficiencia:"Famílias que têm pessoas com deficiencia",
	im_crianca_00a03:"Criança de 0 a 3 anos",
	im_crianca_04a06:"Criança de 4 a 6 anos",
	im_crianca_00a06:"Criança de 0 a 6 anos",
	im_crianca_adolescente_07a17:"Criança/Adolescente de 7 a 17 anos",
	im_crianca_adolescente_00a17:"Criança/Adolescente de 0 a 17 anos",
	im_adultos_19a59:"Adulto de 18 a 59 anos",
	im_idoso_60_mais:"Idoso de 60 anos ou mais",
	im_faixa_renda_per_capita_pos_pbf:"Faixa de renda per capita pós PBF",
	im_pessoas_recebe_cuidado:"Pessoas que recebem cuidado permanente de terceiros",
	im_pessoas_com_deficiencia:"Pessoas com deficiência",
	im_tem_membros_raca_cor_negra:"Raça/cor Negra",
	im_familia_pbf_bpc:"Recebe PBF ou BPC",
	im_familia_gpte:"Famílias GPTE",
	im_familia_recebe_beneficio: "Família recebe benefício",
	im_familia_indigena_reside_reserva: "Família reside em reserva indígena"
};

var global_grupo_graficos = 'introducao';


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config({
	baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});


if (typeof app == 'undefined') {
	var app = null;
	var selState = null;
	var field_municipio_selecionado = false;
	var familias_pessoas = null;
}

function filtro_cras_carregado(){
	return ($("#QVFIL05").html() != html_observacao_filtro_cras);
}

function carregar_filtro_cras(app, index = 0){
	if (filtro_cras_carregado()==false){
		$("#QVFIL05").html('<div class="loading"></div>');
		app.getObject('QVFIL05', 'bzpXGRS');
	}
}

function remover_filtro_cras(app, index = 0){
	if (filtro_cras_carregado()){
		$("#QVFIL05").html(html_observacao_filtro_cras);
		app.field('nome_cras').clear();
	}
}

function limpar_filtros(lockedAlso = false) {
	$(".loader").show();
	var min_duration = 5000;
	var start = Date.now();
	
	app.clearAll(lockedAlso);
	
	var duration = Date.now() - start;
	setTimeout(() => { $(".loader").hide(); }, Math.max(min_duration - duration));
}


async function filtros(app, index = 0) {
	$(".loader").show();
	await sleep(2000);
	
	const min_duration = 500;
	const start = Date.now();
	var i = 0;
	for (; i <= 9; i++) {
		if($("#a-l"+i+"-header").attr("data-visible")=="true")
			break;
	}
	
	if (i<=9){
		index=i;
		
		if (index == 0 || index == 1) {
			app.getObject('QVFIL01', 'pjc');
			app.getObject('QVFIL02', 'YsQMmz');
			app.getObject('QVFIL03', 'Nvjva');
			app.getObject('QVFIL04', 'jpBzzB');
			if (field_municipio_selecionado){
				app.getObject('QVFIL05', 'bzpXGRS');
			}
		}

		if (index == 0 || index == 2) {
			app.getObject('B1QVFIL01', 'AkMwqz');
			app.getObject('B1QVFIL02', 'xXmmJf');
			app.getObject('B1QVFIL03', 'AZPkRF');
			app.getObject('B1QVFIL04', 'fXRjtQ');
			app.getObject('B1QVFIL05', 'JpJP');
			app.getObject('B1QVFIL06', 'exjUMpe');
		}
		if (index == 0 || index == 3) {
			app.getObject('B2QVFIL01', 'Crarfd');
			app.getObject('B2QVFIL02', 'JqDjRa');
			app.getObject('B2QVFIL03', 'jks');
			app.getObject('B2QVFIL04', 'GXzKEPW');
			app.getObject('B2QVFIL05', 'pbjEjxY');
			app.getObject('B2QVFIL06', '4c05fb60-1908-457b-b0f6-5dfc486ea8ef');
			app.getObject('B2QVFIL07', 'jvRynDv');
			app.getObject('B2QVFIL08', 'FJBjren');
			app.getObject('B2QVFIL09', 'eNAM');
			app.getObject('B2QVFIL10', 'KcEzQz');
			app.getObject('B2QVFIL11', 'GCmPjrT');
		}
		if (index == 0 || index == 4) {
			app.getObject('B3QVFIL13', 'TkGYk');
			app.getObject('B3QVFIL01', 'baccd090-1baf-4d5f-a107-3cc9b72f2b92');
			app.getObject('B3QVFIL02', 'fGZdHM');
			app.getObject('B3QVFIL03', 'fYdXpjV');
			app.getObject('B3QVFIL04', 'gqqaPb');
			app.getObject('B3QVFIL05', 'VXrNYyy');
			app.getObject('B3QVFIL06', 'xJffd');
			app.getObject('B3QVFIL07', 'aJbJfc');
			app.getObject('B3QVFIL08', 'CCpJzpB');
			app.getObject('B3QVFIL09', 'QrWyJ');
			app.getObject('B3QVFIL10', 'DynwHP');
			app.getObject('B3QVFIL11', 'mGCBs');
			app.getObject('B3QVFIL12', 'pQTCYP');
			app.getObject('B3QVFIL14', 'MqvakT');
			app.getObject('B3QVFIL15', 'kkqmyTj');
			//app.getObject('B3QVFIL16', 'bSqr');
			//app.getObject('B3QVFIL17', 'jJYUhr');

		}
		if (index == 0 || index == 9) {
			app.getObject('BSQVFIL01', 'ZeqmkQ');
			app.getObject('BSQVFIL02', 'ULYrMr');
			app.getObject('BSQVFIL03', 'FbLAeAs');
			app.getObject('BSQVFIL04', 'pswLhG');
			app.getObject('BSQVFIL05', 'XUpDCR');
		}
		if (index == 0 || index == 5) {
			app.getObject('B4QVFIL01', 'cfcb6c3f-4a03-4b6c-b44c-72566b94aa79');
			app.getObject('B4QVFIL02', 'EJrccg');
			app.getObject('B4QVFIL03', 'hLRErdD');
			app.getObject('B4QVFIL04', 'EbPSdb');
			app.getObject('B4QVFIL05', 'uFtZvT');
			app.getObject('B4QVFIL06', 'vaVmsh');
			app.getObject('B4QVFIL07', 'HPYeD');
		}
		if (index == 0 || index == 6) {
			app.getObject('B6QVFIL01', 'jvzpe');
			app.getObject('B6QVFIL02', 'zjMFRuE');
			app.getObject('B6QVFIL03', 'pQSmKa');
			app.getObject('B6QVFIL04', 'muWZBf');
			app.getObject('B6QVFIL05', 'uDpGJ');
			app.getObject('B6QVFIL06', 'ZVjPmZf');
			app.getObject('B6QVFIL07', 'PhmAYn');
			app.getObject('B6QVFIL08', 'JsJhmn');
			app.getObject('B6QVFIL09', 'aqCDtC');
			app.getObject('B6QVFIL10', 'NtEyQVd');
			app.getObject('B6QVFIL11', '9ba94888-860a-496b-8ff9-4b3d1d8314b9');
			app.getObject('B6QVFIL12', 'wTcWh');
			app.getObject('B6QVFIL13', 'zFGwmP');
			app.getObject('B6QVFIL14', 'DLbyhm');
			app.getObject('B6QVFIL15', 'jTEMjh');
			app.getObject('B6QVFIL16', 'rUvQhg');
		}
		if (index == 0 || index == 7) {
			app.getObject('B7QVFIL01', 'kvajEZ');
			app.getObject('B7QVFIL02', 'KGdPBcj');
			app.getObject('B7QVFIL03', 'jmSjU');
			app.getObject('B7QVFIL04', 'GqGxS');
			app.getObject('B7QVFIL05', 'mvTtpek');
			app.getObject('B7QVFIL06', 'Gmeqe');
			app.getObject('B7QVFIL07', 'ScUkpv');
			app.getObject('B7QVFIL08', 'NCJnqs');
			app.getObject('B7QVFIL09', 'jnQQpq');
			app.getObject('B7QVFIL10', 'ZTBjfN');
			app.getObject('B7QVFIL11', 'UMMVYbu');
			app.getObject('B7QVFIL12', 'eggVsG');
			app.getObject('B7QVFIL13', 'eKPpCpU');

		}
		if (index == 0 || index == 8) {
			app.getObject('B8QVFIL01', 'taQmD');
			app.getObject('B8QVFIL02', 'pPcFYP');
			app.getObject('B8QVFIL03', 'MMjZS');
			app.getObject('B8QVFIL04', 'CJBXhQa');
			app.getObject('B8QVFIL05', 'BVWEWE');
			app.getObject('B8QVFIL06', 'nzNPmN');
			app.getObject('B8QVFIL07', 'sVrpPu');
			app.getObject('B8QVFIL08', 'tuGL');
			app.getObject('B8QVFIL09', 'qgdpj');
			app.getObject('B8QVFIL10', 'GhbwEb');
			app.getObject('B8QVFIL11', 'Wurb');
			app.getObject('B8QVFIL12', 'nqwPap');
			app.getObject('B8QVFIL13', 'SjAZJ');
		}
	}
	const duration = Date.now() - start;
	setTimeout(() => { $(".loader").hide(); }, Math.max(min_duration - duration));
}

//Tentativa de encapsular e carregar apenas quando houvesse necessidade, porém o objeto precisa 
//ser recarregado, pois ele fica travado numa visualização estranha.
//função não está sendo utilizada
carregar_objeto_qlik = function (app, html_id, obj_id, config) {
	if ($("#" + html_id).html().indexOf('<div class="loading"></div>') !== -1) {
		return(app.getObject(html_id, obj_id, config));
	}
}


function graficos(app, qlik, no_selection = false, grupo_graficos = "introducao") {
	$("#filtros").hide();
	$(".loader").show();
	const min_duration = 3*1000; //3 segundos
	const start = Date.now();
	global_grupo_graficos = grupo_graficos;
	document.querySelectorAll('.graficos').forEach((item) => {
		$("#" + item.id).hide();
	});
	$("#graficos_" + grupo_graficos).show();
	
	document.getElementById('ul_tab').querySelectorAll('.tab-item, .br-button').forEach((item) => {
		if (item.id.trim()!=""){
			$("#"+ item.id).removeClass('active');
		}
	});
	if (grupo_graficos=="introducao"){
		$("#tab_"+grupo_graficos).addClass('active');
	} else {
		if (grupo_graficos.substring(0,5)=='ivcad'){
			$("#li_ivcad").addClass('active');
		}else{
			$("#li_"+grupo_graficos).addClass('active');
		}
	}
	
	if (grupo_graficos == "introducao") {
		app.getObject('INQVKPI00', 'WjJPje', { noSelections: no_selection });
		app.getObject('INQVKPI01', 'd119ca45-bf50-4e7f-aabc-7cc404dce209', { noSelections: no_selection });
		app.getObject('INQVKPI02', 'f45f8997-b5f9-49e2-8585-77ca19a297d4', { noSelections: no_selection });
		app.getObject('INQVKPI03', 'GeaPcJ', { noSelections: no_selection });
		app.getObject('INQVKPI04', 'TQmGyJJ', { noSelections: no_selection });
		app.getObject('INQV04', 'HeVjYW', { noSelections: no_selection });
		app.getObject('INQV05', 'DcmAygk', { noSelections: no_selection });
	} else if (grupo_graficos == "ivcad") {
		app.getObject('IVQVKPI03', 'ZKYZEw', { noSelections: no_selection });
		app.getObject('IVQVKPI04', 'ZbdkaV', { noSelections: no_selection });
		app.getObject('IVQVKPI05', 'hJJmsQw', { noSelections: no_selection });
		app.getObject('IVQVKPI06', 'jNFKwnD', { noSelections: no_selection });
		app.getObject('IVQVKPI07', 'bReDzmm', { noSelections: no_selection });
		app.getObject('IVQVKPI08', 'SrmpTTz', { noSelections: no_selection });
		app.getObject('IVQVKPI09', 'gpmpQ', { noSelections: no_selection });
		app.getObject('IVQVGRA02', 'hMjzJ', { noSelections: no_selection });
		app.getObject('IVQVGRA03', 'AYeLyP', { noSelections: no_selection });
		app.getObject('IVQVGRA04', 'bpGvrjV', { noSelections: no_selection });
	} else if (grupo_graficos == "ivcad_dpi") {
		app.getObject('IVDPIQVKPI03', 'ZKYZEw', { noSelections: no_selection });
		app.getObject('IVDPIQVKPI04', 'ZbdkaV', { noSelections: no_selection });
		app.getObject('IVDPIQVKPI05', 'hJJmsQw', { noSelections: no_selection });
		app.getObject('IVDPIQVKPI06', 'jNFKwnD', { noSelections: no_selection });
		app.getObject('IVDPIQVKPI07', 'mqXrvUP', { noSelections: no_selection });
		app.getObject('IVDPIQVKPI08', 'DhgMJcM', { noSelections: no_selection });
		app.getObject('IVDPIQVKPI09', 'scjkqb', { noSelections: no_selection });
		app.getObject('IVDPIQVGRA02', '6b55c876-c19a-4e4a-9fd3-6f3f3f1676b3', { noSelections: no_selection });
		app.getObject('IVDPIQVGRA03', 'dc640d50-b9a4-4244-9232-fcc1c17841f5', { noSelections: no_selection });
		app.getObject('IVDPIQVGRA04', 'sVX', { noSelections: no_selection });
	} else if (grupo_graficos == "ivcad_nc") {
		app.getObject('IVNCQVKPI03', 'ZKYZEw', { noSelections: no_selection });
		app.getObject('IVNCQVKPI04', 'ZbdkaV', { noSelections: no_selection });
		app.getObject('IVNCQVKPI05', 'hJJmsQw', { noSelections: no_selection });
		app.getObject('IVNCQVKPI06', 'jNFKwnD', { noSelections: no_selection });
		app.getObject('IVNCQVKPI07', 'mqefzaw', { noSelections: no_selection });
		app.getObject('IVNCQVKPI08', 'FBweBbW', { noSelections: no_selection });
		app.getObject('IVNCQVKPI09', 'YNknkm', { noSelections: no_selection });
		app.getObject('IVNCQVGRA02', '4c3ca2ff-d6f2-4466-a276-cda87d363f4b', { noSelections: no_selection });
		app.getObject('IVNCQVGRA03', 'ZDWdJ', { noSelections: no_selection });
		app.getObject('IVNCQVGRA04', 'mnbZWE', { noSelections: no_selection });
	} else if (grupo_graficos == "ivcad_ch") {
		app.getObject('IVCHQVKPI03', 'ZKYZEw', { noSelections: no_selection });
		app.getObject('IVCHQVKPI04', 'ZbdkaV', { noSelections: no_selection });
		app.getObject('IVCHQVKPI05', 'hJJmsQw', { noSelections: no_selection });
		app.getObject('IVCHQVKPI06', 'jNFKwnD', { noSelections: no_selection });
		app.getObject('IVCHQVKPI07', 'qqnRaj', { noSelections: no_selection });
		app.getObject('IVCHQVKPI08', 'SuHmy', { noSelections: no_selection });
		app.getObject('IVCHQVKPI09', 'vuXTfa', { noSelections: no_selection });
		app.getObject('IVCHQVGRA02', 'e7effecf-8c4b-491e-8578-10a65fea5f60', { noSelections: no_selection });
		app.getObject('IVCHQVGRA03', '8b41f861-e5b9-48b4-bb84-0ed9d46274b1', { noSelections: no_selection });
		app.getObject('IVCHQVGRA04', 'xFKLURf', { noSelections: no_selection });
	} else if (grupo_graficos == "ivcad_dr") {
		app.getObject('IVDRQVKPI03', 'ZKYZEw', { noSelections: no_selection });
		app.getObject('IVDRQVKPI04', 'ZbdkaV', { noSelections: no_selection });
		app.getObject('IVDRQVKPI05', 'hJJmsQw', { noSelections: no_selection });
		app.getObject('IVDRQVKPI06', 'jNFKwnD', { noSelections: no_selection });
		app.getObject('IVDRQVKPI07', 'qW', { noSelections: no_selection });
		app.getObject('IVDRQVKPI08', 'spdHaA', { noSelections: no_selection });
		app.getObject('IVDRQVKPI09', 'RmChH', { noSelections: no_selection });
		app.getObject('IVDRQVGRA02', 'bd7977d6-0335-497d-a1e9-552b9f9aac89', { noSelections: no_selection });
		app.getObject('IVDRQVGRA03', '75219ec7-f9ce-49c7-bd1f-efb9e13f386a', { noSelections: no_selection });
		app.getObject('IVDRQVGRA04', 'upAcnPC', { noSelections: no_selection });
	} else if (grupo_graficos == "ivcad_tqa") {
		app.getObject('IVTQAQVKPI03', 'ZKYZEw', { noSelections: no_selection });
		app.getObject('IVTQAQVKPI04', 'ZbdkaV', { noSelections: no_selection });
		app.getObject('IVTQAQVKPI05', 'hJJmsQw', { noSelections: no_selection });
		app.getObject('IVTQAQVKPI06', 'jNFKwnD', { noSelections: no_selection });
		app.getObject('IVTQAQVKPI07', 'ZpXcDk', { noSelections: no_selection });
		app.getObject('IVTQAQVKPI08', 'yeMJLP', { noSelections: no_selection });
		app.getObject('IVTQAQVKPI09', 'xLWRr', { noSelections: no_selection });
		app.getObject('IVTQAQVGRA02', 'e02f1a85-ae99-4f0c-a559-ad9404d3f26e', { noSelections: no_selection });
		app.getObject('IVTQAQVGRA03', '9ea8433c-babc-476c-8856-861524462171', { noSelections: no_selection });
		app.getObject('IVTQAQVGRA04', 'SMPTg', { noSelections: no_selection });
	} else if (grupo_graficos == "ivcad_dca") {
		app.getObject('IVDCAQVKPI03', 'ZKYZEw', { noSelections: no_selection });
		app.getObject('IVDCAQVKPI04', 'ZbdkaV', { noSelections: no_selection });
		app.getObject('IVDCAQVKPI05', 'hJJmsQw', { noSelections: no_selection });
		app.getObject('IVDCAQVKPI06', 'jNFKwnD', { noSelections: no_selection });
		app.getObject('IVDCAQVKPI07', 'TJECQqB', { noSelections: no_selection });
		app.getObject('IVDCAQVKPI08', 'QFyeUT', { noSelections: no_selection });
		app.getObject('IVDCAQVKPI09', 'VmmyWg', { noSelections: no_selection });
		app.getObject('IVDCAQVGRA02', '7f7e941e-f6df-4289-b0c9-d691c27105ee', { noSelections: no_selection });
		app.getObject('IVDCAQVGRA03', '8c71bb93-0162-43a4-baeb-e840481e4f32', { noSelections: no_selection });
		app.getObject('IVDCAQVGRA04', 'BJSgSd', { noSelections: no_selection });
	} else if (grupo_graficos == "identificacao_controle") {
		app.getObject('ICQVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('ICQVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('ICQVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('ICQVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('ICQVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('ICQVGRA01', '15ff9d19-5aa3-469e-aae4-d6cf4acf1dbe', { noSelections: no_selection });
		app.getObject('ICQVGRA02', 'XcHJeY', { noSelections: no_selection });
		app.getObject('ICQVGRA03', '606e0b3a-82f2-4b28-b136-93fc7dbd633d', { noSelections: no_selection });
		app.getObject('ICQVGRA04', '2ca295de-7c2d-4b11-9fee-6db7cea802ec', { noSelections: no_selection });
		app.getObject('ICQVGRA05', 'KJsTQVM', { noSelections: no_selection });
		//app.getObject('ICQVGRA06', 'NXEYecA', { noSelections: no_selection });
		app.getObject('B_ICGRA06', 'NXEYecA', { noSelections: no_selection });
	} else if (grupo_graficos == "caracteristicas_domicilio_01") {
		app.getObject('CD1QVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('CD1QVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('CD1QVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('CD1QVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('CD1QVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('CD1QVGRA01', 'd6435e33-6348-4224-a53b-ff7711a3d9d1', { noSelections: no_selection });
		app.getObject('CD1QVGRA02', '1d6d5ffa-8d0f-4cf3-9127-2ba0aa00723b', { noSelections: no_selection });
		app.getObject('CD1QVGRA03', '5af21425-82eb-46ea-b5d5-7f304cc0a344', { noSelections: no_selection });
		app.getObject('CD1QVGRA04', 'Bzk', { noSelections: no_selection });
		app.getObject('CD1QVGRA05', 'ZMZyHw', { noSelections: no_selection });
	} else if (grupo_graficos == "caracteristicas_domicilio_02") {
		app.getObject('CD2QVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('CD2QVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('CD2QVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('CD2QVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('CD2QVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('CD2QVGRA01', 'AdjzPe', { noSelections: no_selection });
		app.getObject('CD2QVGRA02', 'dKSHnt', { noSelections: no_selection });
		app.getObject('CD2QVGRA03', 'prYQmX', { noSelections: no_selection });
		app.getObject('CD2QVGRA04', 'axbVv', { noSelections: no_selection });
		app.getObject('CD2QVGRA05', 'bVhUBP', { noSelections: no_selection });
		app.getObject('CD2QVGRA06', 'kjPxKae', { noSelections: no_selection });
	} else if (grupo_graficos == "familia") {
		app.getObject('FGQVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('FGQVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('FGQVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('FGQVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('FGQVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('FGQVKPI07', 'APjpD', { noSelections: no_selection });
		app.getObject('FGQVKPI08', 'JcUuDW', { noSelections: no_selection });
		app.getObject('FGQVKPI09', 'jULTfM', { noSelections: no_selection });
		app.getObject('FGQVKPI11', 'sCAHPjw', { noSelections: no_selection });
		app.getObject('FGQVKPI10', 'JsQttU', { noSelections: no_selection });
		app.getObject('FGQVKPI12', 'qNuzbj', { noSelections: no_selection });
		app.getObject('FGQVGRA01', 'HwQbpZ', { noSelections: no_selection });
		app.getObject('FGQVGRA02', 'YtKaD', { noSelections: no_selection });
		//app.getObject('FGQVGRA02', 'hFfjAej', { noSelections: no_selection });
		//app.getObject('FGQVGRA05', 'JqBNyp', { noSelections: no_selection });
		app.getObject('FGQVGRA03', 'sBSSHeZ', { noSelections: no_selection });
		app.getObject('FGQVGRA04', 'gCQbejS', { noSelections: no_selection });
		} else if (grupo_graficos == "beneficios_sociais") {
		app.getObject('BSQVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('BSQVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('BSQVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('BSQVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('BSQVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('BSQVGRA01', 'DuEJZ', { noSelections: no_selection });
		app.getObject('BSQVGRA02', 'nKPcwn', { noSelections: no_selection });
		app.getObject('BSQVGRA03', 'gmdxbJw', { noSelections: no_selection });
		app.getObject('BSQVGRA04', 'FymUHrw', { noSelections: no_selection });
		app.getObject('BSQVGRA05', 'NnkfFpm', { noSelections: no_selection });
		app.getObject('BSQVGRA06', 'JUqtPG', { noSelections: no_selection });
	} else if (grupo_graficos == "identificacao_pessoa") {
		app.getObject('IPQVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('IPQVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('IPQVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('IPQVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('IPQVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('IPQVKPI07', 'MnSExN', { noSelections: no_selection });
		app.getObject('IPQVKPI08', 'WDWq', { noSelections: no_selection });
		app.getObject('IPQVKPI09', 'FUNe', { noSelections: no_selection });
		app.getObject('IPQVKPI10', 'pJvjBn', { noSelections: no_selection });
		app.getObject('IPQVGRA01', 'XcJnz', { noSelections: no_selection });
		app.getObject('IPQVGRA02', 'jsuEGJy', { noSelections: no_selection });
		app.getObject('IPQVGRA03', 'pHbRxXh', { noSelections: no_selection });
		app.getObject('IPQVGRA03', 'Wjqpsq', { noSelections: no_selection });
		app.getObject('IPQVGRA04', 'vSXCVpU', { noSelections: no_selection });
	} else if (grupo_graficos == "ajuda_deficiencia") {
		app.getObject('PDQVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('PDQVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('PDQVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('PDQVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('PDQVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('PDQVGRA01', 'pQp', { noSelections: no_selection });
		app.getObject('PDQVGRA02', 'QRbaRH', { noSelections: no_selection });
		app.getObject('PDQVGRA03', 'GTSLgT', { noSelections: no_selection });
		app.getObject('PDQVGRA04', 'tNJbnK', { noSelections: no_selection });
		app.getObject('PDQVGRA05', 'XpszAbP', { noSelections: no_selection });
		app.getObject('PDQVGRA06', 'UYyZ', { noSelections: no_selection });

	} else if (grupo_graficos == "escolaridade") {
		app.getObject('ESQVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('ESQVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('ESQVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('ESQVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('ESQVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('ESQVGRA01', 'MEDTv', { noSelections: no_selection });
		app.getObject('ESQVGRA02', 'LJHGCM', { noSelections: no_selection });
		app.getObject('ESQVGRA03', 'pmUMT', { noSelections: no_selection });
		app.getObject('ESQVGRA04', 'KqhHuak', { noSelections: no_selection });
	} else if (grupo_graficos == "trabalho_remuneracao") {
		app.getObject('TRQVKPI01', '310d6787-b8f5-4075-8f42-a5f796b207f9', { noSelections: no_selection });
		app.getObject('TRQVKPI02', '3e0d55f7-d29a-435f-9e7c-86cd2c158647', { noSelections: no_selection });
		app.getObject('TRQVKPI04', 'fe3c9cd0-70e0-4209-aaf9-5e50b66883b6', { noSelections: no_selection });
		app.getObject('TRQVKPI05', '7f71ec26-be2f-48e0-a278-c5ab6e820f60', { noSelections: no_selection });
		app.getObject('TRQVKPI06', 'd66ed314-4d0d-495f-929d-4ba583a6a26a', { noSelections: no_selection });
		app.getObject('TRQVKPI07', 'YgXNJg', { noSelections: no_selection });
		app.getObject('TRQVKPI08', 'FDECujJ', { noSelections: no_selection });
		app.getObject('TRQVGRA01', 'YnBmwpB', { noSelections: no_selection });
		app.getObject('TRQVGRA02', 'DBLLJtK', { noSelections: no_selection });
		app.getObject('TRQVGRA03', 'YbmKHP', { noSelections: no_selection });
	} else if (grupo_graficos == "tabela_familias_pessoas") {
		app.getObject('TBQVTAB01', 'cf0ef996-e6d9-4695-aa83-c8af0e8ee01a').then(
		//app.getObject('TBQVTAB01', 'AJQuMP').then(
			function (reply) {
				$('#exportar_tabela_rg').click(function () {
					var qTable = qlik.table(reply);
					qTable.exportData({
						format: 'OOXML',
						filename: 'regiao_tabela_qtd_familias_pessoas.csv',
						download: true
					});
					abrir_modal_avaliacao();
				});
			});
			
			app.getObject('TBQVTAB02', 'e8728a40-cb5e-4bb0-a86f-65c777b958e7').then(
			//app.getObject('TBQVTAB02', 'nCJJbb').then(
			function (reply) {
				$('#exportar_tabela_uf').click(function () {
					var qTable = qlik.table(reply);
					qTable.exportData({
						format: 'OOXML',
						filename: 'uf_tabela_qtd_familias_pessoas.csv',
						download: true
					});
					abrir_modal_avaliacao();
				});
			});
			app.getObject('TBQVTAB03', '5b027e83-ee05-4fff-9384-197cde0588be').then(
			//app.getObject('TBQVTAB03', 'dXGPe').then(
			function (reply) {
				$('#exportar_tabela_mu').click(function () {
					var qTable = qlik.table(reply);
					qTable.exportData({
						format: 'OOXML',
						filename: 'municipio_tabela_qtd_familias_pessoas.csv', 
						download: true
					});
					abrir_modal_avaliacao();
				});
			});
	} 
	const duration = Date.now() - start;
	setTimeout(() => { $(".loader").hide(); }, Math.max(min_duration - duration));
}

function listener() {
	if (selState.selections !== undefined) {
		if (selState.selections[0].fieldName == "anomes") {
			let qSelected = selState.selections[0].qSelected;
			//Foi necessário adicionar o dia para que funcionasse no Firefox.
			let d = new Date(qSelected + '/01');
			let month = d.getUTCMonth() + 1;
			let year = d.getUTCFullYear();
			let t = "Referência: " + meses[month] + " de " + year;
			$("#span_referencia_cadastro").html(t);
		};
		var qtd_filtros = selState.selections.length - 1;
		
		field_municipio_selecionado = 	check_if_field_selected("uf_municipio", true) ||
										check_if_field_selected("nome_municipio", true);
		if (field_municipio_selecionado){
			carregar_filtro_cras(app);
		}else{
			remover_filtro_cras(app);
		}
	
		$("#span_filtros_aplicados").html('Filtros aplicados: ' + qtd_filtros);
		if (qtd_filtros > 0) {
			var texto = "";
			selState.selections.forEach((sel) => {
				var fieldName = sel.fieldName.toLowerCase();
				var campo_split = fieldName.split("#");
				campo = ((campo_split.length > 1) ? campo_split[1] : campo_split[0]);
				descricao = campos_descricao[campo];
				if (descricao == undefined) {
					descricao = campo;
				}
				texto += "<b>" + descricao + "</b> = " + sel.qSelected + "<br>"
			}
			);
			$("#modal_filtros_aplicados_body").html(texto);
		}
		if (qtd_filtros > 0) {
			$("#span_filtros_mostrar").show();
			$("#span_filtros_excluir").show();
		} else {
			$("#span_filtros_mostrar").hide();
			$("#span_filtros_excluir").hide();
		}
	}

	app.getList("SelectionObject", function (reply) {
		sessionStorage.setItem("selections", JSON.stringify(reply.qSelectionObject.qSelections))
	});
};


function check_if_field_selected(field, apenas_um_selecionado=false) {
	var retorno = false;
	if (selState.selections !== undefined) {
			selState.selections.forEach(function (sel, i) {
				if (sel.fieldName == field){
					if (apenas_um_selecionado==true){
						if (sel.qSelected.indexOf(',')==-1 && 
							sel.qSelected.indexOf(' of ')==-1){
							retorno = true;	
						}
					}else{
						retorno=true;
					}
				}
					
				
			});
	}
	return(retorno);
}


function count_selected_field(field) {
	var retorno;
	if (selState.selections !== undefined) {
			selState.selections.forEach(function (sel, i) {
				if (sel.fieldName == field){
					retorno = sel.selectedCount;
					return(retorno);
				}
			});
	}
	return(retorno);
}


require(["js/qlik"], function (qlik) {
	qlik.on("error", function (error) {
		$('#popupText').append(error.message + "<br>");
		$('#popup').fadeIn(1000);
	});

	$("#closePopup").click(function () {
		$('#popup').hide();
	});

	if (app === null) {
		//app = qlik.openApp('822d228d-05de-4f57-b03a-3ee8d8b09568', config);
		//app = qlik.openApp('7451d577-3580-49ee-9996-69123b0d35a3', config);
		//app = qlik.openApp('6c3cd825-854a-4c7b-bebb-c8923fbc5a9c', config);
		//app = qlik.openApp('cdd64086-5616-47ce-9b58-5494a940ba03', config);
		app = qlik.openApp('99994c4c-7bf6-4fad-b269-d5ad13cd57f4', config);
	}




	///////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////FILTROS APLICADOS///////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////
	if (selState === null) {
		selState = app.selectionState();
		selState.OnData.bind(listener);
	}
	///////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////FILTROS APLICADOS///////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////


	//filtros(app);
	graficos(app, qlik, mobile);

	var idleTime = 0;

	function timerIncrement() {
		idleTime = idleTime + 1;
		if (idleTime >= 10) { // 10 minutos
			app.close();
			$("#container_modal_inatividade").css("display", "flex");
			console.log((Date.now()-initial_time)/1000);
		}
	}

$(document).ready(function () {
		const initial_time = Date.now();

		// Increment the idle time counter every minute.
		var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

		// Zero the idle timer on mouse movement.
		$(this).mousemove(function (e) {
			idleTime = 0;
		});
		
		$(this).mousedown(function (e) {
			idleTime = 0;
			console.log((Date.now()-initial_time)/1000);
			
			if ((Date.now()-initial_time)/1000>180){
				abrir_modal_avaliacao();
			}
		});
		
		$(this).keypress(function (e) {
			idleTime = 0;
		});

		//Loads and applies selections from local storage on document ready.
		var selections = JSON.parse(sessionStorage.getItem("selections"));
		if (typeof selections === 'undefined' || selections == null) {
			app.clearAll(true);
			app.field("im_faixa_renda_per_capita").selectValues([10,20], false, true);
			$("#container_modal_boasvindas").css("display", "flex");
		} else {
			if (selections.length > 1) {
				selections.forEach(function (selection) {
					app.field(selection.qField).selectMatch(selection.qSelected, true);
				});			
			}else{
				app.field("im_faixa_renda_per_capita").selectValues([10,20], false, true);
				$("#container_modal_boasvindas").css("display", "flex");
			}
		}
		
		

		//Adicionar comportamento de clique nos filtros
		$("#icon_filtro").click(function () {
			$("#filtros").toggle(0, function () {
				if ($("#filtros").is(":visible")) {
					filtros(app);
					$("#exportar_tabela").hide();
				}
				else
					$("#exportar_tabela").show();
			});

			$("#graficos_" + global_grupo_graficos).toggle(0, function () {
				if ($("#graficos_" + global_grupo_graficos).is(":visible")) {
					graficos(app, qlik, mobile, global_grupo_graficos);
				}
			});
		});

		//configurando comportamentos de click
		$("#aplicar_filtros").click(function () {
			$("#icon_filtro").click();
		});

		$("#span_filtros_mostrar").click(function () {
			$("#container_modal_filtros_aplicados").css("display", "flex");
		});


		$("#tab_introducao").click(function () {
			graficos(app, qlik, mobile, 'introducao');
		});
		$("#tab_ivcad").click(function () {
			graficos(app, qlik, mobile, 'ivcad');
		});
		$("#tab_identificacao_controle").click(function () {
			graficos(app, qlik, mobile, 'identificacao_controle');
		});
		$("#tab_caracteristicas_domicilio_01").click(function () {
			graficos(app, qlik, mobile, 'caracteristicas_domicilio_01');
		});
		$("#tab_caracteristicas_domicilio_02").click(function () {
			graficos(app, qlik, mobile, 'caracteristicas_domicilio_02');
		});
		$("#tab_familia").click(function () {
			graficos(app, qlik, mobile, 'familia');
		});
		$("#tab_beneficios_sociais").click(function () {
			graficos(app, qlik, mobile, 'beneficios_sociais');
		});
		$("#tab_identificacao_pessoa").click(function () {
			graficos(app, qlik, mobile, 'identificacao_pessoa');
		});
		$("#tab_ajuda_deficiencia").click(function () {
			graficos(app, qlik, mobile, 'ajuda_deficiencia');
		});
		$("#tab_escolaridade").click(function () {
			graficos(app, qlik, mobile, 'escolaridade');
		});
		$("#tab_trabalho_remuneracao").click(function () {
			graficos(app, qlik, mobile, 'trabalho_remuneracao');
		});
		$("#tab_tabela_familias_pessoas").click(function () {
			graficos(app, qlik, mobile, 'tabela_familias_pessoas');
		});



		$("#menu_introducao").click(function () {
			graficos(app, qlik, mobile, 'introducao');
			$("#menu_fechar").click();
		});
		$("#menu_ivcad").click(function () {
			graficos(app, qlik, mobile, 'ivcad');
			$("#menu_fechar").click();
		});
		$("#menu_identificacao_controle").click(function () {
			graficos(app, qlik, mobile, 'identificacao_controle');
			$("#menu_fechar").click();
		});
		$("#menu_caracteristicas_domicilio_01").click(function () {
			graficos(app, qlik, mobile, 'caracteristicas_domicilio_01');
			$("#menu_fechar").click();
		});
		$("#menu_caracteristicas_domicilio_02").click(function () {
			graficos(app, qlik, mobile, 'caracteristicas_domicilio_02');
			$("#menu_fechar").click();
		});
		$("#menu_familia").click(function () {
			graficos(app, qlik, mobile, 'familia');
			$("#menu_fechar").click();
		});
		$("#menu_beneficios_sociais").click(function () {
			graficos(app, qlik, mobile, 'beneficios_sociais');
			$("#menu_fechar").click();
		});
		$("#menu_identificacao_pessoa").click(function () {
			graficos(app, qlik, mobile, 'identificacao_pessoa');
			$("#menu_fechar").click();
		});
		$("#menu_ajuda_deficiencia").click(function () {
			graficos(app, qlik, mobile, 'ajuda_deficiencia');
			$("#menu_fechar").click();
		});
		$("#menu_escolaridade").click(function () {
			graficos(app, qlik, mobile, 'escolaridade');
			$("#menu_fechar").click();
		});
		$("#menu_trabalho_remuneracao").click(function () {
			graficos(app, qlik, mobile, 'trabalho_remuneracao');
			$("#menu_fechar").click();
		});
		$("#menu_tabela_familias_pessoas").click(function () {
			graficos(app, qlik, mobile, 'tabela_familias_pessoas');
			$("#menu_fechar").click();
		});




		$("#btn_caracteristicas_domicilio_01").click(function () {
			graficos(app, qlik, mobile, 'caracteristicas_domicilio_01');
			$('#li_caracteristicas_domicilio_01').addClass('active');
		});
		$("#btn_caracteristicas_domicilio_02").click(function () {
			graficos(app, qlik, mobile, 'caracteristicas_domicilio_02');
			$('#li_caracteristicas_domicilio_01').addClass('active');
		});
		$("#btn_familia").click(function () {
			graficos(app, qlik, mobile, 'familia');
		});
		$("#btn_beneficios_sociais").click(function () {
			graficos(app, qlik, mobile, 'beneficios_sociais');
		});
		
		//Configurando a navegacao nas dimensoes da pagina do IVCAD atraves do icone
		const ivcad_icon_menu = document.querySelectorAll('.ivcad-icon-area');
		ivcad_icon_menu.forEach(elem => elem.addEventListener('click', ivcad_trocar_dimensao));
		function ivcad_trocar_dimensao(e) {
		  graficos(app, qlik, mobile, e.target.dataset.text);
		}
	
	
	var targetNode = document.getElementById("loader");
	var observer_loader = new MutationObserver(function(){
    if(targetNode.style.display != 'none'){
		window.clearInterval(interval);
		time_start_loading=Date.now();
		carregarFraseLoading();
		interval = setInterval(carregarFraseLoading, 5000);
    }else{
		window.clearInterval(interval);
	}
});
observer_loader.observe(targetNode, { "attributes": true, "childList": true });


// Observer para os elementos dos filtros
var observer_accordion = new MutationObserver(function (mutations) {
	document.querySelectorAll('[data-toggle="accordion"]').forEach((target) => {
		if(target.getAttribute("data-visible") == "true"){
			filtros(app);
		}
	});
 });

// configuração do observador:
var config = { attributes: true, childList: true, characterData: true };

// passar o nó alvo, bem como as opções de observação
document.querySelectorAll('[data-toggle="accordion"]').forEach((target) => {
	observer_accordion.observe(target, config);
	});


// URL to fetch the JSON data
const url_areas_especiais = "https://aplicacoes.cidadania.gov.br/vis/servicos/cidades.php?ot=a";

// Fetch the JSON data
fetch(url_areas_especiais)
	.then(response => response.json())
	.then(data => {
		const select = document.getElementById("select_areas_especiais");

		let option = document.createElement("option");
		option.value = '-1';
		option.textContent = 'Selecione uma das áreas abaixo';
		select.appendChild(option);

		// Iterate through the data and add options dynamically
		for (const key in data) {
			if (data.hasOwnProperty(key) && typeof data[key] === "object") {
				const areaName = data[key]["nome"];
				const ibgeCode = data[key]["ibge"];

				const option = document.createElement("option");
				option.value = ibgeCode;
				option.textContent = areaName;

				select.appendChild(option);
			}
		}
	})
	.catch(error => {
		console.error("Error fetching data:", error);
	});


const select = document.getElementById("select_areas_especiais");
const textarea = document.getElementById("txtarea_lista_mun");
const baseUrl = "https://aplicacoes.cidadania.gov.br/vis/servicos/cidades.php?ot=a&area=";

// Função para buscar os códigos IBGE com base no valor selecionado
function fetchIBGECodes() {
	const selectedValue = select.value;
	if (selectedValue>-1){
		const url = baseUrl + selectedValue;

		fetch(url)
			.then(response => response.json())
			.then(data => {
				// Limpa o conteúdo existente na textarea
				textarea.value = "";
				textarea.value = data["0"]["str_ibges"].replaceAll(",","\n");
			})
			.catch(error => {
				console.error("Erro ao buscar dados:", error);
			});
	}else{
		textarea.value = "";
	}

}

// Adiciona um ouvinte de evento ao elemento select
select.addEventListener("change", fetchIBGECodes);  

});

});
//"<br><div><br><a href='https://forms.office.com/r/GZUgHnDbCu' target='_blank'>Avalie o Observatório do Cadastro Único </a>e contribua para a evolução desta ferramenta tão importante para evolução das políticas públicas sociais.</div>"
function carregarFraseLoading(){
		var idx_loading = randomIntFromInterval(0, conf.frases_loading.length-1);
		var idx_avaliacao = randomIntFromInterval(0, conf.frases_avaliacao.length-1);
		if(Math.random()>0.5){
			$(".loader span").html(conf.frases_loading[idx_loading]+
									"<br><div><br><a href='https://forms.office.com/r/GZUgHnDbCu' target='_blank' onclick='sessionStorage.setItem(\"avaliou\", true);'>"+
									conf.frases_avaliacao[idx_avaliacao]+"</a></div>");
		}else{
			$(".loader span").html(conf.frases_loading[idx_loading]+
									"<br><div><br>Para melhor experiência, utilize o navegador em tela cheia (F11) com resolução <i>full HD</i> (1920x1080px).</div>");
		}
}


function hideLoader() {
	let min_duration = 3000;
	var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
	setTimeout(() => { $(".loader").hide(); }, Math.max(min_duration - loadTime, min_duration));
}

async function selecionar_municipios_por_ibge(lista){
		$(".loader").show();
		var mensagem = '';
		var invalido = 0;
		var s;
		if (lista.length > 50000){
			mensagem='Limite de texto atingido, envie no máximo 50000 caracteres. Ou seja, não mais que 5570 códigos ibges de municípios separados por vírgula.';
		}else{
			s = lista.split(',');
			if (s.length==1){
				s=lista.split(/\r?\n|\r|\n/g);
			}
			var invalido = 0;
			s.forEach(function(element, index){
									element = element.replace(/\D/g, "").substr(0, 6);
									this[index]=parseInt(element);
									if(/^\d+$/.test(element)===false){
										invalido++;
									}else if (element.length!=6) {
										invalido++;
									}
								   }, s);  
			if (invalido>0){
				mensagem='Na listagem há '+invalido+' código de IBGEs inválidos. Favor, revisar a listagem e verificar se todos os códigos possuem apenas números e que estes sejam todos de 6 dígitos cada.';
			}
		}
		
		if (mensagem.length>0){
			alert(mensagem);
		}else{
			app.field("codigo_ibge").selectValues(s, true, true);
			
			var t=0;
			if (s.length<10){
				t=10;
			}else if(s.length<100){
				t=20;
			}else{
				t=30;
			}
			
			var segundos = 0;
			while(count_selected_field("codigo_ibge") == undefined || (count_selected_field("codigo_ibge")<s.length && segundos<t)){
				await sleep(1000);
				segundos++;
			}
			
			app.field("uf_municipio").selectPossible(true);
			segundos = 0;
			while(count_selected_field("uf_municipio") == undefined || (count_selected_field("uf_municipio")<s.length && segundos<t)){
				await sleep(1000);
				segundos++;
			}
			
			app.field("codigo_ibge").clear();
			segundos = 0;
			//O retorno tem que ser undefined para identificar um campo sem filtro aplicado.
			while(count_selected_field("codigo_ibge") != undefined && segundos<t){
				await sleep(1000);
				segundos++;
			}
			
			$("#container_modal_selecao_municipios").hide();
		}
		
		$(".loader").hide();
}

function maximizeElement(elemId) {
        var elem = document.getElementById(elemId);
        elem.classList.toggle('maximized');
		app.getObject('B_ICGRA06', 'NXEYecA');		
}

function callback_cookiebar(jsonSaida) {
  // Implementar o tratamento dos cookeis segundo as regras de negócio.
  console.log(jsonSaida);
}

const cookiebarList = [];
// É necessário informar o json de entrada no formato string e, também, uma funçao de callback.
for (const brCookiebar of window.document.querySelectorAll('.br-cookiebar')) {
  const params = {
    name: 'br-cookiebar',
    component: brCookiebar,
    json: json_cookiebar,
    lang: 'pt-br',
    mode: 'default',
    callback: callback_cookiebar,
  };
  cookiebarList.push(new core.BRCookiebar(params));
}


function abrir_modal_avaliacao(){
	var avaliou = sessionStorage.getItem("avaliou");
	if (typeof avaliou === 'undefined' || avaliou == null) {
		$("#container_modal_avaliacao").css("display", "flex");
	}
}