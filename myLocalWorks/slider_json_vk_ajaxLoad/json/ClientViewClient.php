<?php //
class ClientViewClient {

    public function view() { ?>
<h1>Клиенты</h1>
		<div id="listClient">
		
		
		<div data-type="static">	
			<div class="filial id">№</div>
			<div class="filial name">Название</div>
			<div class="filial type">
                    <select name="type">
                        <option>Тип</option>
                        <?php foreach (Client::$data['type'] as $id=>$array):?>
                        <option value="<?= $array['usr_client_type.id']?>"><?=$array['usr_client_type.name']?></option>
                        <?php endforeach; ?>
                    </select>
            </div>
			<div class="filial url">URL</div>
			<div class="filial status">VIP</div>
			<div class="filial email">E-mail</div>
		</div>
		<hr>		
		<?php foreach (Client::$data['client'] as $k => $v) { ?>
			<form data-clientid="<?= $v['usr_client.id'] ?>" data-form-type="Update">
				<div class="filial id">
					<div class="filialInner"><?= $v['usr_client.id'] ?></div>
				</div>
				<div class="filial name" data-name="usr_client[<?= $v['usr_client.id'] ?>][title]">
					<div class="filialInner"><?= $v['usr_client.title'] ?></div>
				</div>
				<div class="filial type" data-name="usr_client_type[<?= $v['usr_client_type.id'] ?>][name]">
					<div class="filialInner"><?= $v['usr_client_type.name'] ?></div>
				</div>
				<div class="filial url">
					<div class="filialInner" >
						<a href="<?= $v["usr_client.url"] ?>" target="_blank"><?= $v["usr_client.url"] ?></a>
					</div>
				</div>
				<div class="filial status" data-name="usr_client[<?= $v['usr_client.id']; ?>][status]">
					<div class="filialInner">
						<?= ($v['usr_client.status']) ? "VIP" : "--"; ?>
					</div>
				</div>
				<div class="filial email">
					<div class="filialInner">
						<?=$v['usr_client.email'];?>
					</div>
				</div>
			</form>
            <? } ?>
			<div class="clearfix"></div>
			<hr>
		</div>
		
		

<?php }

} ?>