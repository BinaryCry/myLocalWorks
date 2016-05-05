<?php
class ClientViewFilial {
    function view() {
?>
<h1>Филиалы (СЛОТЫ)</h1>
	<div id="listFilial">
		<div data-type="static">
			<div class="filial id">
				Slot
			</div>
			<div class="filial name">
				Название
			</div>
			<div class="filial address">
				Адрес
			</div>
			<div class="filial i_phone">
				Телефон
			</div>
			<div class="filial i_shedule">				
                <input name="shedule" placeholder="Режим работы"/>
			</div>
			<div class="filial i_comment">
				Комментарий
			</div>
			<div class="filial status">
				VIP
			</div>
			<div class="filial Price">
				Price
			</div>
		</div>
		<hr>
        <?php foreach (Client::$data['client'] as $k=>$v) {?>
		<form data-clientid="<?= $v['usr_pharmacy.id'];?>" data-form-type="Update">
			<div class="filial id">
				<div class="filialInner"><?= $v['usr_pharmacy.id'];?></div>
			</div>
			<div class="filial name" data-name="usr_client[<?= $v['usr_client.id'];?>][title]">
				<div class="filialInner"><?= $v['usr_client.title'];?></div>
			</div>
			<div class="filial address" data-name="usr_pharmacy[<?= $v['usr_pharmacy.id'];?>][address]">
				<div class="filialInner"><?= $v['usr_pharmacy.address'];?></div>
			</div>
			<div class="filial i_phone" data-name="usr_pharmacy[<?= $v['usr_pharmacy.id'];?>][i_phone]">
				<div class="filialInner"><?= $v['usr_pharmacy.i_phone'];?></div>
			</div>
			<div class="filial i_shedule" data-name="usr_pharmacy[<?= $v['usr_pharmacy.id'];?>][i_shedule]">
				<div class="filialInner"><?= $v['usr_pharmacy.i_shedule'];?></div>
			</div>
			<div class="filial i_comment" data-name="usr_pharmacy[<?= $v['usr_pharmacy.id'];?>][i_coment]">
				<div class="filialInner"><?= $v['usr_pharmacy.i_coment'];?></div>
			</div>
			<div class="filial status" data-name="usr_pharmacy[<?= $v['usr_pharmacy.id'];?>][status]">
				<div class="filialInner">
					<?=($v['usr_pharmacy.status'])?"VIP":"--";?>
				</div>
			</div>
			<div class="filial Price">
				<div class="filialInner">
					<a href="http://meddovidka.ua/price_load.php?p_id=<?= $v['usr_pharmacy.id']*1234;?>" target="_blank">29616</a>
				</div>
			</div>
		</form>
        <?php } ?>
		<div class="clearfix"></div>
		<hr>
	</div>
<?php
    }
}
?>